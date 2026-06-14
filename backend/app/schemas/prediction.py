from pydantic import BaseModel


class PredictionRequest(BaseModel):
    lens_type: str
    lens_index: float
    coating: str
    inventory_available: int
    current_stage: str
    time_in_stage_hours: int
    qc_failed: int
    reorder_required: int