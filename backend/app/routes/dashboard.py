from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order
from app.models.inventory import Inventory

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def get_dashboard(
    db: Session = Depends(get_db)
):

    total_orders = db.query(
        Order
    ).count()

    active_orders = db.query(
        Order
    ).filter(
        Order.status != "Delivered"
    ).count()

    delivered_orders = db.query(
        Order
    ).filter(
        Order.status == "Delivered"
    ).count()

    high_risk_orders = db.query(
        Order
    ).filter(
        Order.risk_score >= 70
    ).count()

    low_stock_items = db.query(
        Inventory
    ).filter(
        Inventory.quantity < 5
    ).count()
    sla_breached_orders = db.query(
        Order
    ).filter(
        Order.sla_breached == 1
    ).count()

    return {
        "total_orders": total_orders,
        "active_orders": active_orders,
        "delivered_orders": delivered_orders,
        "high_risk_orders": high_risk_orders,
        "low_stock_items": low_stock_items,
        "sla_breached_orders": sla_breached_orders
    }