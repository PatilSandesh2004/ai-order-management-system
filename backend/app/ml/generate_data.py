import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

NUM_RECORDS = 20000

lens_types = {
    "Single Vision": 48,
    "Progressive": 120,
    "High Index": 168,
    "Bifocal": 96
}

lens_indexes = [1.50, 1.56, 1.60, 1.67, 1.74]

coatings = [
    "Blue Cut",
    "Anti Glare",
    "UV Protection",
    "Photochromic"
]

frames = [
    "Full Rim",
    "Half Rim",
    "Rimless",
    "Sports",
    "Aviator"
]

stores = [
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Chennai"
]

stages = [
    "Order Placed",
    "Prescription Verification",
    "Lens Cutting",
    "Coating",
    "Assembly",
    "QC",
    "Packing",
    "Shipped",
    "Delivered"
]

delay_reasons = [
    "Inventory Shortage",
    "Supplier Delay",
    "Machine Downtime",
    "QC Failure",
    "Logistics Delay"
]

rows = []

for order_id in range(1, NUM_RECORDS + 1):

    lens_type = random.choices(
        ["Single Vision", "Progressive", "High Index", "Bifocal"],
        weights=[50, 25, 10, 15]
    )[0]

    sla_hours = lens_types[lens_type]

    if lens_type == "Single Vision":
        inventory_available = random.choices([1, 0], weights=[90, 10])[0]
    elif lens_type == "Progressive":
        inventory_available = random.choices([1, 0], weights=[70, 30])[0]
    elif lens_type == "High Index":
        inventory_available = random.choices([1, 0], weights=[50, 50])[0]
    else:
        inventory_available = random.choices([1, 0], weights=[75, 25])[0]

    current_stage = random.choice(stages)

    power = round(random.uniform(-8.0, 6.0), 2)

    lens_index = random.choice(lens_indexes)

    coating = random.choice(coatings)

    frame_type = random.choice(frames)

    store_location = random.choice(stores)

    order_date = (
        datetime.now()
        - timedelta(days=random.randint(1, 730))
    )

    time_in_stage_hours = random.randint(1, 72)

    qc_failed = random.choices(
        [0, 1],
        weights=[92, 8]
    )[0]

    reorder_required = qc_failed

    total_processing_hours = random.randint(
        int(sla_hours * 0.5),
        int(sla_hours * 1.8)
    )

    risk_score = 0

    if inventory_available == 0:
        risk_score += 40

    if qc_failed:
        risk_score += 30

    if current_stage == "Coating":
        risk_score += 15

    if total_processing_hours > sla_hours:
        risk_score += 25

    delayed = 1 if risk_score >= 50 else 0

    delay_reason = None

    if delayed:
        delay_reason = random.choice(delay_reasons)

    rows.append({
        "order_id": order_id,
        "order_date": order_date.date(),
        "store_location": store_location,

        "lens_type": lens_type,
        "lens_index": lens_index,
        "power": power,
        "coating": coating,
        "frame_type": frame_type,

        "inventory_available": inventory_available,

        "current_stage": current_stage,

        "sla_hours": sla_hours,
        "time_in_stage_hours": time_in_stage_hours,
        "total_processing_hours": total_processing_hours,

        "qc_failed": qc_failed,
        "reorder_required": reorder_required,

        "delay_reason": delay_reason,

        "delayed": delayed
    })

df = pd.DataFrame(rows)

output_path = "backend/datasets/eyewear_orders.csv"

df.to_csv(output_path, index=False)

print("Dataset Generated Successfully")
print("Shape:", df.shape)
print(df.head())