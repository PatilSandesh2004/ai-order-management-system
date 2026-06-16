# AI-Powered Order Management System

## 1. Project Summary

This project is an AI-powered order management system for an eyewear brand.

It is built to manage the full order lifecycle:

1. Order intake
2. Inventory check
3. Production and status tracking
4. SLA prediction
5. Breach alerts
6. Delivery and reporting

The main idea is simple:

- keep all orders in one place
- show the current stage of every order
- predict delays before they happen
- alert the team early

This is important for eyewear orders because they are not normal e-commerce orders. Each order depends on:

- prescription
- lens type
- lens index
- coating
- frame
- SLA for that lens type

So the system must be smarter than a normal order dashboard.

---

## 2. What We Built

The system is divided into 3 main business modules:

### Module 1: Lens Inventory Management

This module checks whether the required lens and coating are already available in stock.

If the item is available:

- the order can move faster
- inventory quantity is reduced
- the team gets a lower risk situation

If the item is not available:

- the order may be delayed
- the system marks it as risky
- procurement or reorder may be needed

### Module 2: Order Lifecycle + Dashboard

This module tracks the full journey of the order.

It shows:

- order placed
- lens cutting
- polishing
- coating
- quality check
- delivered

It also shows dashboard KPIs like:

- total orders
- active orders
- delivered orders
- high risk orders
- low stock items
- SLA breached orders

The team can also filter orders by:

- status
- lens type
- store location

### Module 3: TAT Prediction + Breach Alerts

This module predicts whether an order is likely to miss its SLA.

It uses order history and operational data such as:

- lens type
- lens index
- coating
- inventory availability
- current stage
- time in stage
- QC failure
- reorder requirement

If the risk is high:

- the system shows an alert
- the team can act before the SLA is broken
- email alerts can be sent

---

## 3. Starting Point of the Project

If I explain the project from the beginning, I would say:

### Step 1: Order comes in

The store or team creates a new eyewear order.

The order contains:

- customer name
- lens type
- lens index
- power
- coating
- frame type
- store location

### Step 2: Inventory is checked

The system checks whether the exact lens specification is already available in inventory.

This matters because if stock is not available, the order will take longer.

### Step 3: AI prediction is generated

The system uses a trained machine learning model to predict:

- low risk
- high risk
- probability of delay

### Step 4: Order is saved and tracked

The order is stored in the database with:

- status
- risk score
- recommendation
- inventory availability
- expected delivery date

### Step 5: Operations team updates status

As the order moves through the factory, the team updates the current status.

If there is a delay, they can also log a reason.

### Step 6: Dashboard and alerts update

The dashboard refreshes the operational picture.

If an order becomes high risk or breaches SLA, the alert system notifies the team.

---

## 4. Module-Wise Explanation

### A. Lens Inventory Management

#### What this module does

This module keeps track of stock for lenses and coatings.

It answers a simple business question:

**Is the required lens already available or not?**

#### Why it matters

Eyewear production is highly dependent on the right lens inventory.

If stock is available:

- the order can move immediately
- risk of delay becomes lower

If stock is unavailable:

- the order may wait
- SLA risk increases

#### How it works in the system

The backend checks the inventory table when a new order is created.

If the item exists:

- stock quantity is reduced
- the order is marked inventory available

If stock falls very low:

- a low stock alert can be shown
- email notification can be triggered

#### What I can say in the demo

“This module makes sure the right lens stock is available before production starts. If the item is in stock, the order flows faster. If not, the system flags it early so the team can act before delay happens.”

---

### B. Order Lifecycle and Dashboard

#### What this module does

This module tracks the complete order journey from start to finish.

It shows the current status of each order and gives the operations team one screen to manage everything.

#### Main statuses

- Order Placed
- Lens Cutting
- Polishing
- Coating
- Quality Check
- Delivered

#### Dashboard features

The dashboard shows:

- total orders
- active orders
- delivered orders
- high risk orders
- low stock items
- SLA breached orders
- recent orders
- risk distribution
- status distribution

#### Why it matters

The team should not open many screens for basic operational control.

The dashboard gives a quick operational view so they can:

- see what is pending
- see what is delayed
- see what needs attention now

#### What I can say in the demo

“This dashboard is the control room. It tells the team how many orders are active, how many are delivered, which ones are high risk, and where the bottlenecks are.”

---

### C. TAT Prediction and Breach Alerts

#### What this module does

This is the AI part of the project.

It predicts whether an order is likely to breach SLA before the breach actually happens.

#### Inputs used by the model

- lens type
- lens index
- coating
- inventory availability
- current stage
- time in stage
- QC failed
- reorder required

#### Output

The model gives:

- low risk or high risk
- breach probability
- recommendation

Example output:

- “High Risk”
- risk score: 82.5
- recommendation: “Prioritize manufacturing and allocate inventory.”

#### Why it matters

This lets the team act early instead of reacting after the delay is already gone.

For example:

- move the order to priority
- assign senior QC
- replenish stock
- escalate the issue

#### What I can say in the demo

“This module predicts delay before it happens. It gives the team an early warning, so they can reduce SLA breaches and improve delivery speed.”

---

## 5. How the Model Was Trained

The SLA prediction model is not an LLM.
It is a classical machine learning model trained on structured tabular data.

### Training data

The project uses a dataset of eyewear order records with features like:

- lens type
- lens index
- coating
- inventory availability
- current stage
- time in stage
- QC failed
- reorder required

The target label is:

- delayed

### Training process

The training script does the following:

1. Loads the dataset from `backend/datasets/eyewear_orders.csv`
2. Selects the input features
3. Encodes categorical columns using `LabelEncoder`
4. Splits data into train and test sets
5. Trains a `RandomForestClassifier`
6. Evaluates accuracy, confusion matrix, and classification report
7. Saves the trained model to `backend/trained_models/sla_model.pkl`
8. Saves the encoders to `backend/trained_models/encoders.pkl`

### Why this model was used

We used Random Forest because it is a good fit for this kind of problem.

It works well on:

- structured data
- mixed feature types
- non-linear business patterns

It is also:

- fast
- reliable
- easy to deploy
- easier to explain than many other models

### Why not other models

#### Why not LLMs?

LLMs are good for:

- chat
- summarization
- question answering
- natural language reasoning

But SLA prediction is not a text problem.

It is a tabular prediction problem.

Using an LLM here would be a bad fit because:

- it is slower
- it costs more
- it is less deterministic
- it is harder to explain
- it is unnecessary for structured prediction

#### Why not a pure rule-based system?

Rule-based logic is simple, but it cannot learn patterns from historical data.

For example, a rule system cannot easily learn:

- which lens types are more likely to breach
- which combinations of stage and inventory create delay risk
- how QC failure changes delay probability

The ML model can learn these relationships from data.

#### Why not a deep neural network?

For this project, a deep model is not needed because:

- the data is structured
- the dataset is not huge
- Random Forest is easier to train and explain
- inference is simpler for a demo and production-style system

### In simple words

We trained the model using past order data.

The model learned which order patterns usually lead to delay.

Then it uses those learned patterns to score new orders.

---

## 6. Why We Are Not Using LLMs for Prediction

This is an important point for your explanation.

### Short answer

We are not using an LLM for SLA prediction because the task is a machine learning classification problem, not a language task.

### Easy explanation

An LLM is best when you want it to understand and generate text.

But here we want it to answer:

- Will this order be delayed?
- What is the risk score?
- Is inventory available?

That kind of work is better done by a trained ML model.

### Where LLMs are used in this project

We do use an LLM in the chat feature.

That is a good use case because:

- the user asks questions in natural language
- the system routes the question to the right tool
- the LLM can turn the tool output into a readable answer

So the project uses both:

- ML model for prediction
- LLM for conversation

That is the best of both worlds.

---

## 7. Architecture Note

### High-Level Architecture

```text
React Frontend
    ↓
FastAPI Backend
    ↓
Business Services
    ↓
Database + ML Model + Alerts
```

### Main layers

#### Frontend

The frontend is built in React.

It contains:

- dashboard
- orders page
- inventory page
- alerts page
- analytics page
- chat page

#### Backend API

FastAPI handles:

- order creation
- status updates
- inventory management
- dashboard data
- alerts
- chat requests
- prediction logic

#### Database

The database stores:

- orders
- inventory records
- status history

This gives full traceability.

#### ML Layer

The ML layer contains:

- model training script
- saved Random Forest model
- label encoders
- prediction function

#### Alert Layer

The alert system sends notifications for:

- high risk orders
- SLA breaches
- low inventory

#### Chat Layer

The chat feature uses:

- a router to pick the right tool
- tools for orders, inventory, dashboard, and analytics
- an LLM to generate the final conversational response

---

## 8. How the AI Flow Works

### Prediction flow

1. New order comes in
2. Inventory is checked
3. Features are prepared
4. The trained model predicts delay risk
5. Risk score is generated
6. Recommendation is created
7. Alert is triggered if the risk is high

### Chat flow

1. User asks a question
2. Router decides which tool to use
3. Tool collects the right data
4. LLM converts the tool data into a natural answer

---

## 9. What to Say in a 15-Minute Demo

### Opening

“This is an AI-powered order management system built for an eyewear brand. It manages the full lifecycle of an order from intake to delivery.”

### Then explain the 3 modules

#### Module 1: Inventory

“We first check whether the correct lens is available in stock. If the item is already in-house, the order moves faster. If not, the system flags a delay risk.”

#### Module 2: Orders and Dashboard

“The dashboard gives the operations team a live view of all orders. They can see active orders, delivered orders, current status, and delay reasons.”

#### Module 3: Prediction and Alerts

“The AI model predicts which orders are likely to breach SLA. It uses historical data and current order stage to generate a risk score and alert the team early.”

### Close with the AI explanation

“We used a Random Forest model for prediction because this is structured tabular data. We did not use an LLM for prediction because the problem is not a text task. We use an LLM only for chat, where natural language understanding is useful.”

---

## 10. Why This Project Is Good

- it solves a real business problem
- it combines operations + AI
- it improves SLA performance
- it reduces manual tracking effort
- it supports early intervention
- it is easy to demo and explain

---

## 11. One-Page Architecture Note

If you need a short architecture note for submission, use this:

### Architecture Note

The AI-Powered Order Management System is built using a React frontend and a FastAPI backend. The system manages eyewear orders from intake to delivery, including inventory validation, status tracking, SLA prediction, alerts, and reporting.

The backend stores operational data in a relational database and uses a trained Random Forest classifier to predict SLA breach risk from structured features such as lens type, lens index, coating, inventory availability, current stage, time in stage, QC failures, and reorder requirement. The model is trained on historical order data and saved for inference.

Random Forest was chosen because the problem is tabular, structured, and business-driven. It is fast, accurate, and easier to explain than deep learning models. LLMs are not used for prediction because this is not a language task. Instead, LLMs are used only in the chat assistant, where they help convert tool outputs into natural language answers.

The system also includes proactive alerting for high-risk orders, low stock inventory, and SLA breaches. This allows the operations team to intervene early and reduce delays.

---

## 12. Short Conclusion

This project is a complete AI-assisted operations system.

It combines:

- inventory management
- order lifecycle tracking
- ML-based SLA prediction
- alerting
- chat-based assistance

If you present it clearly, the main message is:

**“We built a smart order operations platform that helps the team manage eyewear orders faster, predict delay before it happens, and act early.”**

---

## 13. 15-Minute Demo Script

Use this if you want to speak naturally during the demo.

### 0 to 1 minute: Project introduction

“Hi everyone. This project is an AI-powered order management system for an eyewear brand. It manages the full order flow from order intake to delivery. The main goal is to track every order, check inventory, predict delay risk, and alert the team early.”

### 1 to 3 minutes: Why this problem matters

“Eyewear orders are different from normal online orders. Every order depends on prescription details, lens type, lens index, coating, and frame type. Each lens type also has a different SLA. So if stock is missing or QC fails, the order can easily get delayed.”

### 3 to 6 minutes: Module 1 inventory

“The first module is inventory management. When an order is placed, the system checks whether the required lens is already available in stock. If stock is available, the order can move quickly. If not, the system marks it as risky because procurement or reorder will take extra time. This helps the team avoid surprise delays.”

### 6 to 9 minutes: Module 2 dashboard and order lifecycle

“The second module is the order lifecycle and dashboard. Here we track the order through every production stage, like order placed, lens cutting, polishing, coating, quality check, and delivered. The dashboard gives a live view of total orders, active orders, delivered orders, high risk orders, low stock items, and SLA breaches. The team can also update the status and log a delay reason.”

### 9 to 12 minutes: Module 3 prediction and alerts

“The third module is AI prediction and breach alerts. We trained a Random Forest model on historical eyewear order data. The model uses structured features like lens type, lens index, coating, inventory availability, current stage, time in stage, QC failure, and reorder requirement. It predicts whether an order is low risk or high risk and gives a breach probability. If the risk is high, the system can trigger alerts so the team can act before the SLA is broken.”

### 12 to 14 minutes: Why Random Forest and not LLM

“We used Random Forest because this is a structured tabular prediction problem. It is fast, accurate, and easy to explain. We did not use an LLM for prediction because an LLM is better for language tasks, not numerical or tabular forecasting. The LLM in this project is used only for the chat feature, where it helps answer natural language questions.”

### 14 to 15 minutes: Closing

“So overall, this project combines inventory management, order tracking, AI-based risk prediction, and alerts in one platform. It helps the operations team react earlier, reduce SLA breaches, and manage eyewear orders more efficiently.”

---

## 14. Slide Outline

If you want to make a PPT, use this flow:

### Slide 1: Title

- AI-Powered Order Management System
- Eyewear brand use case

### Slide 2: Problem Statement

- Eyewear orders are complex
- SLA breaches cause delays
- Inventory and QC create bottlenecks

### Slide 3: System Overview

- Order intake
- Inventory check
- Prediction
- Alerts
- Dashboard

### Slide 4: Module 1 Inventory Management

- Stock availability check
- Low stock detection
- Faster fulfilment when stock exists

### Slide 5: Module 2 Order Lifecycle and Dashboard

- Status tracking
- Filters by status, lens type, store
- Live operational visibility

### Slide 6: Module 3 AI Prediction

- Random Forest model
- Predicts SLA breach risk
- Uses historical order data

### Slide 7: Alerts

- High risk alerts
- SLA breach alerts
- Low stock alerts

### Slide 8: Why this model

- Structured data problem
- Random Forest is suitable
- LLM is not used for prediction

### Slide 9: Architecture

- React frontend
- FastAPI backend
- Database
- ML model
- Chat assistant

### Slide 10: Conclusion

- Faster order operations
- Better visibility
- Early delay prediction
- Better SLA control
