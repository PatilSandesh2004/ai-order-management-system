from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.order import Order

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/store-performance")
def store_performance(
    db: Session = Depends(get_db)
):

    results = db.query(
        Order.store_location,
        func.count(Order.id)
    ).group_by(
        Order.store_location
    ).all()

    data = []

    for store, count in results:

        data.append({
            "store_location": store,
            "orders": count
        })

    return data