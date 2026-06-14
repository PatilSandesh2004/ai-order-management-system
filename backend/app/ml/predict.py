# from pathlib import Path

# import joblib
# import pandas as pd


# # ==================================================
# # Project Paths
# # ==================================================

# BASE_DIR = Path(__file__).resolve().parents[2]

# MODEL_PATH = BASE_DIR / "trained_models" / "sla_model.pkl"
# ENCODER_PATH = BASE_DIR / "trained_models" / "encoders.pkl"

# print("BASE_DIR:", BASE_DIR)
# print("MODEL_PATH:", MODEL_PATH)
# print("ENCODER_PATH:", ENCODER_PATH)

# # ==================================================
# # Load Model & Encoders
# # ==================================================

# model = joblib.load(MODEL_PATH)
# encoders = joblib.load(ENCODER_PATH)

# print("Model Loaded Successfully")
# print("Encoders Loaded Successfully")


# # ==================================================
# # Prediction Function
# # ==================================================

# def predict_delay(
#     lens_type: str,
#     lens_index: float,
#     coating: str,
#     inventory_available: int,
#     current_stage: str,
#     time_in_stage_hours: int,
#     qc_failed: int,
#     reorder_required: int,
# ):

#     data = pd.DataFrame(
#         [
#             {
#                 "lens_type": lens_type,
#                 "lens_index": lens_index,
#                 "coating": coating,
#                 "inventory_available": inventory_available,
#                 "current_stage": current_stage,
#                 "time_in_stage_hours": time_in_stage_hours,
#                 "qc_failed": qc_failed,
#                 "reorder_required": reorder_required,
#             }
#         ]
#     )

#     # Encode categorical columns

#     data["lens_type"] = encoders["lens_type"].transform(
#         data["lens_type"]
#     )

#     data["coating"] = encoders["coating"].transform(
#         data["coating"]
#     )

#     data["current_stage"] = encoders["current_stage"].transform(
#         data["current_stage"]
#     )

#     prediction = model.predict(data)[0]

#     probability = model.predict_proba(data)[0][1]

#     return {
#         "prediction": (
#             "High Risk"
#             if prediction == 1
#             else "Low Risk"
#         ),
#         "breach_probability": round(
#             probability * 100,
#             2
#         ),
#     }


# # ==================================================
# # Local Testing
# # ==================================================

# if __name__ == "__main__":

#     result = predict_delay(
#         lens_type="Progressive",
#         lens_index=1.67,
#         coating="Blue Cut",
#         inventory_available=0,
#         current_stage="Coating",
#         time_in_stage_hours=40,
#         qc_failed=0,
#         reorder_required=0,
#     )

#     print("\nPrediction Result:")
#     print(result)


from pathlib import Path

import joblib
import pandas as pd


BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = (
    BASE_DIR /
    "trained_models" /
    "sla_model.pkl"
)

ENCODER_PATH = (
    BASE_DIR /
    "trained_models" /
    "encoders.pkl"
)

model = joblib.load(MODEL_PATH)
encoders = joblib.load(ENCODER_PATH)


def generate_recommendation(
    risk_score,
    inventory_available,
    current_stage,
    qc_failed,
    reorder_required
):

    if inventory_available == 0:
        return (
            "Inventory unavailable. "
            "Trigger replenishment immediately."
        )

    if reorder_required == 1:
        return (
            "Reorder required. "
            "Procurement team should prioritize stock."
        )

    if qc_failed == 1:
        return (
            "Quality check failure detected. "
            "Assign senior QC team."
        )

    if risk_score >= 80:
        return (
            "Critical SLA risk. "
            "Expedite manufacturing and assign priority resources."
        )

    if risk_score >= 60:
        return (
            "High delay risk. "
            "Monitor production closely."
        )

    if current_stage == "Quality Check":
        return (
            "Fast track QC approval "
            "to avoid SLA breach."
        )

    return (
        "Order is progressing normally."
    )


def predict_delay(
    lens_type: str,
    lens_index: float,
    coating: str,
    inventory_available: int,
    current_stage: str,
    time_in_stage_hours: int,
    qc_failed: int,
    reorder_required: int,
):

    data = pd.DataFrame([
        {
            "lens_type": lens_type,
            "lens_index": lens_index,
            "coating": coating,
            "inventory_available": inventory_available,
            "current_stage": current_stage,
            "time_in_stage_hours": time_in_stage_hours,
            "qc_failed": qc_failed,
            "reorder_required": reorder_required,
        }
    ])

    data["lens_type"] = (
        encoders["lens_type"]
        .transform(data["lens_type"])
    )

    data["coating"] = (
        encoders["coating"]
        .transform(data["coating"])
    )

    data["current_stage"] = (
        encoders["current_stage"]
        .transform(data["current_stage"])
    )

    prediction = model.predict(
        data
    )[0]

    probability = (
        model.predict_proba(data)[0][1]
    )

    risk_score = round(
        probability * 100,
        2
    )

    recommendation = (
        generate_recommendation(
            risk_score=risk_score,
            inventory_available=inventory_available,
            current_stage=current_stage,
            qc_failed=qc_failed,
            reorder_required=reorder_required
        )
    )

    return {
        "prediction": (
            "High Risk"
            if prediction == 1
            else "Low Risk"
        ),
        "breach_probability":
            risk_score,
        "recommendation":
            recommendation
    }


if __name__ == "__main__":

    result = predict_delay(
        lens_type="Progressive",
        lens_index=1.67,
        coating="Blue Cut",
        inventory_available=0,
        current_stage="Coating",
        time_in_stage_hours=40,
        qc_failed=0,
        reorder_required=0,
    )

    print(result)