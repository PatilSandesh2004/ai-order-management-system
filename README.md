# AI-Powered Order Management System (AI OMS)

## Overview

AI OMS is an AI-powered Order Management System built for eyewear manufacturing and fulfillment operations.

The system manages the complete order lifecycle from order creation to delivery while using Machine Learning to predict SLA breaches, generate risk alerts, monitor inventory levels, and assist operations teams in making proactive decisions.

---

# Features

## 1. Lens Inventory Management

* Inventory Creation
* Inventory Tracking
* Inventory Availability Check
* Automatic Inventory Deduction
* Low Stock Detection
* Inventory Forecasting
* Email Alerts for Low Stock

### Workflow

Customer Order

↓

Check Inventory

↓

Available → Use Existing Stock

↓

Unavailable → Procurement Required

---

## 2. Order Lifecycle Management

The system tracks orders through all manufacturing stages:

```text
Order Placed
↓
Lens Cutting
↓
Polishing
↓
Coating
↓
Quality Check
↓
Delivered
```

### Features

* Order Creation
* Status Updates
* Timeline Tracking
* Delay Reason Logging
* Order History
* SLA Monitoring

---

## 3. AI SLA Breach Prediction

Machine Learning predicts whether an order is likely to breach SLA.

### Prediction Inputs

* Lens Type
* Lens Index
* Coating
* Inventory Availability
* Current Stage
* Time in Stage
* QC Failures
* Reorder Required

### Prediction Outputs

* Risk Score
* High Risk / Low Risk
* AI Recommendation

Example:

```json
{
    "prediction": "High Risk",
    "risk_score": 82.5,
    "recommendation": "Prioritize manufacturing and allocate inventory."
}
```

---

## 4. Dashboard

Real-time dashboard displaying:

* Total Orders
* Active Orders
* Delivered Orders
* High Risk Orders
* SLA Breaches
* Inventory Status
* Risk Distribution
* Order Status Distribution

---

## 5. Email Alert System

Automated email notifications for:

### High Risk Orders

Triggered when AI predicts SLA breach risk.

### Low Stock Alerts

Triggered when inventory falls below threshold.

### SLA Breach Alerts

Triggered when delivered order exceeds SLA.

---

## 6. Reports & Analytics

* Store Performance Analytics
* Inventory Forecasting
* SLA Monitoring
* Order Trends
* Risk Analysis

---

# Technology Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Recharts
* Axios
* React Router

## Backend

* FastAPI
* SQLAlchemy
* Pydantic

## Database

* PostgreSQL

## AI / Machine Learning

* Scikit-Learn
* Random Forest Classifier
* Joblib

## Notifications

* Gmail SMTP
* Python SMTP Library

---

# System Architecture

```text
Frontend (React)
        │
        ▼
FastAPI Backend
        │
        ├── PostgreSQL Database
        │
        ├── ML Prediction Engine
        │
        └── Email Notification Service
```

---

# API Endpoints

## Health Check

### GET /

Returns application status.

Response:

```json
{
    "status": "running"
}
```

---

# Orders APIs

## Create Order

### POST /orders

Creates a new order.

Request:

```json
{
    "customer_name": "John",
    "store_location": "Bangalore",
    "lens_type": "Progressive",
    "lens_index": 1.67,
    "power": -3.5,
    "coating": "Blue Cut",
    "frame_type": "Metal"
}
```

Response:

```json
{
    "order_id": 1,
    "prediction": "Low Risk",
    "risk_score": 25.5,
    "recommendation": "Order progressing normally"
}
```

---

## Get Orders

### GET /orders

Returns all orders.

---

## Update Order Status

### PUT /orders/{order_id}/status

Request:

```json
{
    "status": "Lens Cutting",
    "delay_reason": ""
}
```

---

## Order History

### GET /orders/{order_id}/history

Returns full status history.

---

## Order Timeline

### GET /orders/{order_id}/timeline

Returns lifecycle timeline.

---

## Filter Orders

### GET /orders/filter

Query Parameters:

```text
status
store_location
lens_type
```

Example:

```text
/orders/filter?status=Delivered
```

---

# Inventory APIs

## Create Inventory

### POST /inventory

Request:

```json
{
    "lens_type": "Progressive",
    "lens_index": 1.67,
    "power": -3.5,
    "coating": "Blue Cut",
    "quantity": 20
}
```

---

## Get Inventory

### GET /inventory

Returns inventory list.

---

## Low Stock Alerts

### GET /inventory/alerts

Returns low stock inventory.

---

## Inventory Forecast

### GET /inventory/forecast

Returns inventory depletion forecast.

---

# Dashboard APIs

## Dashboard Summary

### GET /dashboard

Response:

```json
{
    "total_orders": 120,
    "active_orders": 90,
    "delivered_orders": 25,
    "high_risk_orders": 5
}
```

---

# Alerts APIs

## Alerts

### GET /alerts

Returns all active alerts.

---

# AI Model

## Algorithm

Random Forest Classifier

### Why Random Forest?

* High Accuracy
* Handles Non-linear Data
* Robust Against Overfitting
* Interpretable Feature Importance

### Features Used

* Lens Type
* Lens Index
* Coating
* Inventory Availability
* Current Stage
* Time in Stage
* QC Failure
* Reorder Requirement

---

# Deployment

## Backend

```bash
uvicorn app.main:app --reload
```

## Frontend

```bash
npm install
npm run dev
```

---

# Environment Variables

```env
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
ALERT_EMAIL=receiver_email@gmail.com
```

---

# Future Enhancements

* WhatsApp Alerts
* Real-Time WebSockets
* JWT Authentication
* Multi-Warehouse Inventory
* Demand Forecasting
* AI Chat Assistant
* Predictive Procurement

---

# Author

Sandesh Patil

Computer Science Engineer

Dayananda Sagar University

2025 Graduate
