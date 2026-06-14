from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float

from app.database import Base


class Inventory(Base):

    __tablename__ = "inventory"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    lens_type = Column(String)

    lens_index = Column(Float)

    power = Column(Float)

    coating = Column(String)

    quantity = Column(Integer)