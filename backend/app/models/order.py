from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import DateTime

from datetime import datetime

from app.database import Base


class Order(Base):

    __tablename__ = "orders"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    customer_name = Column(
        String
    )

    store_location = Column(
        String
    )

    lens_type = Column(
        String
    )

    lens_index = Column(
        Float
    )

    power = Column(
        Float
    )

    coating = Column(
        String
    )

    frame_type = Column(
        String
    )

    status = Column(
        String
    )

    inventory_available = Column(
        Integer
    )

    risk_score = Column(
        Float
    )

    prediction = Column(
        String
    )

    recommendation = Column(
        String
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    expected_delivery_date = Column(
        DateTime
    )

    actual_delivery_date = Column(
        DateTime,
        nullable=True
    )

    sla_breached = Column(
        Integer,
        default=0
    )