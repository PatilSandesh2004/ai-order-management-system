# Detailed Service Architecture

## Order Management Service

The Order Management Service is the core business module of the system.

Its responsibility is to manage the complete lifecycle of an eyewear order.

Unlike traditional e-commerce products, eyewear orders contain prescription-specific attributes that directly impact manufacturing complexity and delivery timelines.

### Responsibilities

* Create new orders
* Track order progress
* Store AI predictions
* Maintain SLA information
* Trigger alerts
* Record status history

### APIs

#### POST /orders

Creates a new order.

Flow:

Client
↓
FastAPI
↓
Inventory Validation
↓
AI Prediction
↓
Database Storage
↓
Email Alert
↓
Response

#### GET /orders

Returns all orders.

Used by:

* Dashboard
* Operations Team
* Reporting

#### PUT /orders/{id}/status

Updates production status.

Used by:

* Manufacturing Team
* Production Supervisors

#### GET /orders/{id}/history

Retrieves complete order audit history.

#### GET /orders/{id}/timeline

Returns lifecycle timeline.

#### GET /orders/filter

Provides filtered operational views.

---

# Inventory Management Architecture

Inventory directly impacts turnaround time.

If inventory is unavailable:

* Procurement may be required
* Manufacturing gets delayed
* SLA breach probability increases

### Responsibilities

* Track stock levels
* Validate inventory availability
* Reduce stock on order creation
* Detect low inventory situations

### APIs

#### POST /inventory

Add inventory.

#### GET /inventory

Retrieve inventory.

#### GET /inventory/alerts

Retrieve low stock alerts.

### Business Flow

Order Created
↓
Inventory Check
↓
Inventory Available?

YES
↓
Reduce Quantity
↓
Continue Processing

NO
↓
Mark Inventory Unavailable
↓
Increase Risk Score

---

# AI Prediction Service Architecture

The AI service provides predictive intelligence.

Instead of reacting to delays, the system predicts delays before they occur.

### Purpose

Predict:

* SLA Breach Probability
* Order Risk Level
* Operational Recommendation

### API

#### POST /predict

Receives operational parameters.

Returns:

* Prediction
* Risk Score
* Recommendation

### Prediction Flow

Order Features
↓
Feature Encoding
↓
Random Forest Model
↓
Probability Calculation
↓
Risk Score
↓
Recommendation

### Features Used

* Lens Type
* Lens Index
* Coating
* Inventory Availability
* Current Stage
* Time In Stage
* QC Failure
* Reorder Requirement

### Outputs

Low Risk

Medium Risk

High Risk

---

# Dashboard Analytics Architecture

The Dashboard module aggregates information across the system.

Instead of querying multiple tables independently from the frontend, the dashboard endpoint provides a consolidated operational view.

### API

#### GET /dashboard

Returns:

* Total Orders
* Active Orders
* Delivered Orders
* High Risk Orders
* Low Stock Items
* SLA Breached Orders
* Recent Orders
* Risk Distribution
* Status Distribution

### Dashboard Data Flow

Orders Table
↓
Inventory Table
↓
Status History Table
↓
Aggregation Layer
↓
Dashboard API
↓
React Dashboard

---

# Alerting Architecture

The Alert Service provides proactive operational visibility.

### Alert Types

#### High Risk Order Alert

Trigger:

Risk Score >= 70

Purpose:

Allow operations teams to intervene before delays occur.

#### SLA Breach Alert

Trigger:

Actual Delivery Date >
Expected Delivery Date

Purpose:

Immediate escalation.

#### Low Stock Alert

Trigger:

Inventory Quantity < 5

Purpose:

Avoid production interruptions.

### Alert Flow

Business Event
↓
Alert Evaluation
↓
Email Service
↓
SMTP Server
↓
Operations Team

---

# Database Architecture

The database follows a normalized relational design.

## Orders Table

Stores:

* Customer Details
* Product Specifications
* AI Predictions
* Delivery Information

Relationship:

One Order
↓
Many Status Updates

---

## Inventory Table

Stores inventory master data.

Used during:

* Order Creation
* Inventory Validation
* Alert Generation

---

## Status History Table

Provides full auditability.

Stores:

* Status
* Delay Reason
* Timestamp

Every order status transition generates a new history record.

---

# End-to-End System Flow

1. Store creates order.
2. FastAPI receives request.
3. Inventory service checks stock.
4. AI service predicts SLA breach probability.
5. Order stored in PostgreSQL.
6. High-risk alert generated if required.
7. Manufacturing updates order status.
8. Status history maintained.
9. Dashboard updated.
10. Delivery completed.
11. SLA validation performed.
12. Breach alert generated if delayed.

---

# Why Machine Learning Instead of LLMs?

Many modern systems use LLMs for every problem. However, SLA prediction is fundamentally a structured tabular prediction problem.

### Nature of Data

Inputs are:

* Lens Type
* Lens Index
* Inventory Availability
* QC Failures
* Reorder Flags

These are structured features.

### Why Random Forest?

Advantages:

* Fast Inference
* Low Cost
* Explainable
* Easy Deployment
* High Accuracy on Tabular Data

### Why Not LLM?

LLMs excel at:

* Text Generation
* Summarization
* Question Answering
* Conversational Interfaces

This project does not require language understanding for prediction.

Using an LLM for SLA prediction would:

* Increase latency
* Increase cost
* Reduce explainability
* Introduce unnecessary complexity

### Future LLM Use Cases

Potential future enhancements:

* Order Assistant Chatbot
* Operational Copilot
* Inventory Q&A Assistant
* Natural Language Reporting
* Root Cause Analysis Assistant

Therefore:

Random Forest is used for prediction.

LLMs can be added later as an intelligence layer on top of the operational platform.
