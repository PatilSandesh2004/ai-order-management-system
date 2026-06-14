from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order

router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"]
)


@router.get("/")
def get_alerts(
    db: Session = Depends(get_db)
):

    risky_orders = db.query(
        Order
    ).filter(
        Order.risk_score >= 70
    ).all()

    result = []

    for order in risky_orders:

        result.append(
            {
                "order_id": order.id,
                "customer_name": order.customer_name,
                "risk_score": order.risk_score,
                "status": order.status
            }
        )

    return result