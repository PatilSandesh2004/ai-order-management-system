from pydantic import BaseModel


class InventoryCreate(BaseModel):

    lens_type: str

    lens_index: float

    power: float

    coating: str

    quantity: int