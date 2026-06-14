from fastapi import APIRouter

from app.schemas.prediction import PredictionRequest
from app.ml.predict import predict_delay

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)


@router.post("/")
def predict_order_delay(
    request: PredictionRequest
):

    result = predict_delay(
        lens_type=request.lens_type,
        lens_index=request.lens_index,
        coating=request.coating,
        inventory_available=request.inventory_available,
        current_stage=request.current_stage,
        time_in_stage_hours=request.time_in_stage_hours,
        qc_failed=request.qc_failed,
        reorder_required=request.reorder_required
    )

    return result