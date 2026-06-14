from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/orders")
def order_report(
    db: Session = Depends(get_db)
):

    total_orders = db.query(
        Order
    ).count()

    delivered = db.query(
        Order
    ).filter(
        Order.status == "Delivered"
    ).count()

    active = db.query(
        Order
    ).filter(
        Order.status != "Delivered"
    ).count()

    high_risk = db.query(
        Order
    ).filter(
        Order.risk_score >= 70
    ).count()

    sla_breached = db.query(
        Order
    ).filter(
        Order.sla_breached == 1
    ).count()

    return {
        "total_orders": total_orders,
        "active_orders": active,
        "delivered_orders": delivered,
        "high_risk_orders": high_risk,
        "sla_breached_orders": sla_breached
    }