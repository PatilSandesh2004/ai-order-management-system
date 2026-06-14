
import os

from app.ml.predict import predict_delay
from app.models.inventory import Inventory

from app.services.email_service import (
    send_email_alert
)


def create_order_service(
    request,
    db
):

    inventory = db.query(
        Inventory
    ).filter(
        Inventory.lens_type == request.lens_type,
        Inventory.lens_index == request.lens_index,
        Inventory.power == request.power,
        Inventory.coating == request.coating,
        Inventory.quantity > 0
    ).first()

    inventory_available = (
        1 if inventory else 0
    )

    if inventory:

        inventory.quantity -= 1

        db.commit()

        if inventory.quantity <= 5:

            send_email_alert(
                subject="Low Stock Alert",
                message=f"""
Low Stock Detected

Lens Type:
{inventory.lens_type}

Lens Index:
{inventory.lens_index}

Power:
{inventory.power}

Coating:
{inventory.coating}

Remaining Quantity:
{inventory.quantity}

Please replenish inventory.
""",
                receiver_email=os.getenv(
                    "ALERT_EMAIL"
                )
            )

    prediction_result = predict_delay(
        lens_type=request.lens_type,
        lens_index=request.lens_index,
        coating=request.coating,
        inventory_available=inventory_available,
        current_stage="Order Placed",
        time_in_stage_hours=1,
        qc_failed=0,
        reorder_required=0
    )

    return {
        "inventory_available":
            bool(inventory_available),

        "prediction":
            prediction_result["prediction"],

        "risk_score":
            prediction_result[
                "breach_probability"
            ],

        "recommendation":
            prediction_result[
                "recommendation"
            ]
    }

