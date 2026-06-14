from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from datetime import datetime
from datetime import timedelta

import os

from app.schemas.order import OrderCreate
from app.schemas.status import StatusUpdate

from app.database import get_db

from app.models.order import Order
from app.models.status_history import StatusHistory

from app.services.order_service import create_order_service

from app.services.email_service import (
    send_email_alert
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.post("/")
def create_order(
    request: OrderCreate,
    db: Session = Depends(get_db)
):

    result = create_order_service(
        request,
        db
    )

    new_order = Order(
        customer_name=request.customer_name,
        lens_type=request.lens_type,
        lens_index=request.lens_index,
        power=request.power,
        coating=request.coating,
        frame_type=request.frame_type,
        status="Order Placed",
        store_location=request.store_location,

        inventory_available=int(
            result["inventory_available"]
        ),

        risk_score=result["risk_score"],

        prediction=result["prediction"],

        recommendation=result["recommendation"],

        expected_delivery_date=
        datetime.utcnow() +
        timedelta(days=7)
    )

    db.add(new_order)

    db.commit()

    db.refresh(new_order)

    print(
        "Risk Score:",
        new_order.risk_score
    )

    if new_order.risk_score >= 70:

        send_email_alert(
            subject="High Risk Order Alert",
            message=f"""
Order ID: {new_order.id}

Customer:
{new_order.customer_name}

Risk Score:
{new_order.risk_score}

Prediction:
{new_order.prediction}

Recommendation:
{new_order.recommendation}
""",
            receiver_email=os.getenv(
                "ALERT_EMAIL"
            )
        )

    history = StatusHistory(
        order_id=new_order.id,
        status="Order Placed",
        delay_reason=""
    )

    db.add(history)

    db.commit()

    return {
        "order_id": new_order.id,
        "customer_name": new_order.customer_name,
        "prediction": new_order.prediction,
        "risk_score": new_order.risk_score,
        "recommendation":
            new_order.recommendation,
        "inventory_available": bool(
            new_order.inventory_available
        ),
        "status": new_order.status,
        "expected_delivery_date":
            new_order.expected_delivery_date
    }


@router.get("/")
def get_orders(
    db: Session = Depends(get_db)
):

    orders = db.query(
        Order
    ).all()

    return orders


@router.put("/{order_id}/status")
def update_status(
    order_id: int,
    request: StatusUpdate,
    db: Session = Depends(get_db)
):

    order = db.query(
        Order
    ).filter(
        Order.id == order_id
    ).first()

    if not order:
        return {
            "message": "Order Not Found"
        }

    order.status = request.status

    if request.status == "Delivered":

        order.actual_delivery_date = (
            datetime.utcnow()
        )

        if (
            order.expected_delivery_date
            and
            order.actual_delivery_date >
            order.expected_delivery_date
        ):

            order.sla_breached = 1

            send_email_alert(
                subject="SLA Breach Alert",
                message=f"""
Order {order.id}
has breached SLA.

Customer:
{order.customer_name}

Expected Delivery:
{order.expected_delivery_date}

Actual Delivery:
{order.actual_delivery_date}
""",
                receiver_email=os.getenv(
                    "ALERT_EMAIL"
                )
            )

    history = StatusHistory(
        order_id=order.id,
        status=request.status,
        delay_reason=request.delay_reason
    )

    db.add(history)

    db.commit()

    db.refresh(order)

    return {
        "message": "Status Updated",
        "order_id": order.id,
        "status": order.status,
        "sla_breached":
            order.sla_breached
    }


@router.get("/{order_id}/history")
def get_order_history(
    order_id: int,
    db: Session = Depends(get_db)
):

    history = db.query(
        StatusHistory
    ).filter(
        StatusHistory.order_id == order_id
    ).all()

    return history


@router.get("/{order_id}/timeline")
def get_timeline(
    order_id: int,
    db: Session = Depends(get_db)
):

    history = db.query(
        StatusHistory
    ).filter(
        StatusHistory.order_id == order_id
    ).all()

    return history


@router.get("/filter")
def filter_orders(
    status: str = None,
    store_location: str = None,
    lens_type: str = None,
    db: Session = Depends(get_db)
):

    query = db.query(Order)

    if status:
        query = query.filter(
            Order.status == status
        )

    if store_location:
        query = query.filter(
            Order.store_location == store_location
        )

    if lens_type:
        query = query.filter(
            Order.lens_type == lens_type
        )

    return query.all()