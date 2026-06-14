from app.database import Base
from app.database import engine

from app.models.order import Order
from app.models.inventory import Inventory
from app.models.status_history import StatusHistory


Base.metadata.create_all(
    bind=engine
)

print("Tables Created Successfully")