import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# Load Dataset
df = pd.read_csv(
    "backend/datasets/eyewear_orders.csv"
)

print("Dataset Shape:", df.shape)

# Features
features = [
    "lens_type",
    "lens_index",
    "coating",
    "inventory_available",
    "current_stage",
    "time_in_stage_hours",
    "qc_failed",
    "reorder_required"
]

# Target
target = "delayed"

X = df[features].copy()
y = df[target]

# Encode categorical columns
encoders = {}

categorical_columns = [
    "lens_type",
    "coating",
    "current_stage"
]

for column in categorical_columns:
    encoder = LabelEncoder()

    X[column] = encoder.fit_transform(
        X[column]
    )

    encoders[column] = encoder

# Train Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("Training Records:", len(X_train))
print("Testing Records:", len(X_test))

# Model
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    random_state=42
)

# Train
model.fit(
    X_train,
    y_train
)

# Predict
predictions = model.predict(
    X_test
)

# Metrics
accuracy = accuracy_score(
    y_test,
    predictions
)

print("\nAccuracy:")
print(accuracy)

print("\nConfusion Matrix:")
print(
    confusion_matrix(
        y_test,
        predictions
    )
)

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        predictions
    )
)

# Save Model
joblib.dump(
    model,
    "backend/trained_models/sla_model.pkl"
)

# Save Encoders
joblib.dump(
    encoders,
    "backend/trained_models/encoders.pkl"
)

print("\nModel Saved Successfully")