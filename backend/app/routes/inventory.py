
from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.inventory import Inventory

from app.schemas.inventory import InventoryCreate


router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"]
)


@router.post("/")
def create_inventory(
    request: InventoryCreate,
    db: Session = Depends(get_db)
):

    inventory = Inventory(
        lens_type=request.lens_type,
        lens_index=request.lens_index,
        power=request.power,
        coating=request.coating,
        quantity=request.quantity
    )

    db.add(inventory)

    db.commit()

    db.refresh(inventory)

    return {
        "inventory_id": inventory.id,
        "message": "Inventory Added"
    }


@router.get("/")
def get_inventory(
    db: Session = Depends(get_db)
):

    inventory = db.query(
        Inventory
    ).all()

    return inventory


@router.get("/alerts")
def get_inventory_alerts(
    db: Session = Depends(get_db)
):

    low_stock_items = db.query(
        Inventory
    ).filter(
        Inventory.quantity < 5
    ).all()

    alerts = []

    for item in low_stock_items:

        alerts.append({
            "lens_type": item.lens_type,
            "lens_index": item.lens_index,
            "power": item.power,
            "coating": item.coating,
            "remaining": item.quantity,
            "alert": "LOW STOCK"
        })

    return alerts


@router.get("/forecast")
def inventory_forecast(
    db: Session = Depends(get_db)
):

    inventory = db.query(
        Inventory
    ).all()

    forecast = []

    for item in inventory:

        daily_usage = 2

        days_remaining = (
            item.quantity /
            daily_usage
        )

        forecast.append({
            "lens_type":
                item.lens_type,

            "lens_index":
                item.lens_index,

            "power":
                item.power,

            "coating":
                item.coating,

            "quantity":
                item.quantity,

            "forecast_days_remaining":
                round(days_remaining, 1),

            "status":
                (
                    "Critical"
                    if days_remaining <= 3
                    else "Healthy"
                )
        })

    return forecast
