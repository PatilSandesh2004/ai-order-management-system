from pydantic import BaseModel


class OrderCreate(BaseModel):

    customer_name: str

    store_location: str

    lens_type: str

    lens_index: float

    power: float

    coating: str

    frame_type: str