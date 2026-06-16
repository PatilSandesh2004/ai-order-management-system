# AI-Powered Order Management System

## 25-Minute Presentation Guide

Use this file as your speaking script and slide plan.

---

## Slide 1: Title Slide

### Title
AI-Powered Order Management System for an Eyewear Brand

### What to say
“This project is a working AI-powered order management system built for an eyewear brand. It manages the full order lifecycle from order intake to delivery, and it uses AI to predict delays and help the operations team act early.”

### Time
1 minute

---

## Slide 2: Problem Statement

### Title
Why This Problem Matters

### What to say
“Eyewear orders are not simple e-commerce orders. Every order has prescription details, lens type, lens index, coating, and frame type. Each lens type also has a different SLA. That means delays can happen at many stages, especially when inventory is missing or QC fails.”

### Key points
- Complex order structure
- Different SLAs for different lens types
- Inventory and QC affect delivery time
- Delay risk must be predicted early

### Time
1.5 minutes

---

## Slide 3: Project Overview

### Title
What We Built

### What to say
“We built one integrated system with three major modules. First is inventory management. Second is order lifecycle tracking with a dashboard. Third is AI-based TAT prediction and breach alerts.”

### Key points
- Inventory management
- Order lifecycle and dashboard
- TAT prediction and alerts
- React frontend + FastAPI backend + ML model

### Time
1 minute

---

## Slide 4: Architecture Overview

### Title
System Architecture

### What to say
“The frontend is built in React. The backend is built in FastAPI. The database stores orders, inventory, and status history. For prediction, we use a trained Random Forest model. For chat-based interaction, we use an LLM only where language understanding is useful.”

### Architecture flow
```text
React UI
   ↓
FastAPI API
   ↓
Database + Business Services
   ↓
ML Model + Alerts + Chat Tools
```

### Time
2 minutes

---

## Slide 5: How We Implemented the System

### Title
Implementation Flow

### What to say
“When a new order is created, the backend checks the inventory, calculates risk, stores the order, and sets an expected delivery date. As the order moves through the factory, the team updates its status. The dashboard and alerts update based on that live data.”

### Implementation steps
1. Create order
2. Check inventory
3. Predict SLA risk
4. Save in database
5. Track status history
6. Show dashboard summary
7. Trigger alerts if risk is high

### Time
2 minutes

---

## Slide 6: Module 1

### Title
Lens Inventory Management

### What to show in UI
- Inventory page
- Add inventory form
- Inventory records table

### What to say
“This module manages lens stock. The system checks whether a required lens, index, and coating are already available in-house. If yes, the order can move quickly. If not, it becomes a risk for delay. This reduces manual checking and improves fulfillment speed.”

### Technical explanation
- Inventory data is stored in the database
- New inventory items can be added from the UI
- The order service checks the stock table when an order is created
- Low stock items can be flagged for replenishment

### Time
2 minutes

---

## Slide 7: Module 1 Technical Notes

### Title
How Inventory Works Internally

### What to say
“The backend performs a stock lookup using the lens type, lens index, power, and coating. If a matching inventory record exists, the quantity is reduced. If the stock is low, the system can raise a replenishment alert. This is a structured inventory validation workflow, not a language problem.”

### Technical terms to mention
- database lookup
- inventory validation
- quantity deduction
- low stock threshold
- operational alerting

### Time
1.5 minutes

---

## Slide 8: Module 2

### Title
Order Lifecycle and Dashboard

### What to show in UI
- Dashboard page
- Orders page
- Filters by status, lens type, and store location
- Create New Order button

### What to say
“This module gives the operations team a live control panel. They can see all active orders, current status, delivered orders, high risk orders, low stock items, and SLA breaches. They can also filter orders and create a new one from the Orders page.”

### Time
2 minutes

---

## Slide 9: Module 2 UI Flow

### Title
How the Orders UI Works

### What to say
“The Orders page is the list and filter screen. It is not overloaded with forms. There is a separate ‘Create New Order’ button that opens the new order page. This keeps the UI clean and matches a real business workflow.”

### UI points
- Orders list page
- Search and filters
- Separate new order page
- Cleaner user experience

### Time
1.5 minutes

---

## Slide 10: Order Creation Flow

### Title
Creating a New Order

### What to say
“When the user clicks ‘Create New Order’, they are taken to a dedicated form. The form asks for the order requirements: customer name, store location, lens type, lens index, power, coating, and frame type. After submission, the backend creates the order and calculates the initial risk.”

### Fields required
- customer name
- store location
- lens type
- lens index
- power
- coating
- frame type

### Time
2 minutes

---

## Slide 11: Module 2 Technical Notes

### Title
Order Tracking Internals

### What to say
“Every order is stored with a current status and a history trail. Status updates are saved in a status history table, which gives full auditability. If the order is marked delivered and the delivery date is beyond SLA, the system marks it as breached.”

### Technical terms
- order table
- status history table
- audit trail
- SLA validation
- expected vs actual delivery date

### Time
1.5 minutes

---

## Slide 12: Module 3

### Title
TAT Prediction and Breach Alerts

### What to show in UI
- Dashboard high-risk section
- Alerts page
- Risk score on orders

### What to say
“This is the AI prediction module. It predicts whether an order may breach SLA before that happens. The system uses order history and current stage to calculate risk. If the risk is high, alerts are generated so the team can intervene early.”

### Time
2 minutes

---

## Slide 13: Model Training

### Title
How the AI Model Was Trained

### What to say
“We trained the model on historical eyewear order data. The training script loads the dataset, selects features, encodes categorical columns, splits the data into train and test sets, and trains a Random Forest classifier. Then the trained model and encoders are saved for inference.”

### Training pipeline
1. Load dataset
2. Select features
3. Encode categorical fields
4. Train-test split
5. Train Random Forest
6. Evaluate accuracy
7. Save model and encoders

### Time
2.5 minutes

---

## Slide 14: Features Used by the Model

### Title
What the Model Learns From

### What to say
“The model does not read text. It learns from structured features like lens type, lens index, coating, inventory availability, current stage, time in stage, QC failure, and reorder requirement. These are the business signals that affect delivery delay.”

### Features
- lens type
- lens index
- coating
- inventory availability
- current stage
- time in stage hours
- QC failed
- reorder required

### Time
1.5 minutes

---

## Slide 15: Why Random Forest

### Title
Why We Chose Random Forest

### What to say
“Random Forest is a strong choice for structured tabular data. It handles non-linear relationships, works well with mixed features, and is easier to explain than deep learning models. It is also fast enough for live inference in an operational system.”

### Reasons
- good for tabular data
- handles non-linear patterns
- low inference latency
- easier to explain
- robust and practical

### Time
1.5 minutes

---

## Slide 16: Why Not Use LLM for Prediction

### Title
Why We Did Not Use an LLM for SLA Prediction

### What to say
“An LLM is great for language tasks like chat, summarization, and question answering. But SLA prediction is a tabular classification problem. Using an LLM for prediction would add cost, latency, and less deterministic behavior. So we use ML for prediction and LLM only for chat.”

### Key message
- LLMs are for language
- SLA prediction is structured ML
- Random Forest is more suitable
- LLM is used only in the chat assistant

### Time
2 minutes

---

## Slide 17: Alerts and Operational Impact

### Title
How Alerts Help the Team

### What to say
“Alerts are triggered for high-risk orders, SLA breaches, and low stock conditions. This helps the operations team take action before the customer is affected. In a production deployment, these alerts can be sent by email or WhatsApp.”

### Time
1.5 minutes

---

## Slide 18: Backend AI Chat Feature

### Title
LLM-Based Chat Assistant

### What to say
“The chat feature is where we do use an LLM. The user asks a question in natural language, the tool router decides which backend tool should answer it, and the LLM converts the result into a readable response. This is a good use case for generative AI because it is language-based.”

### Time
1.5 minutes

---

## Slide 19: Demo Walkthrough

### Title
Live Demo Flow

### What to show
1. Login
2. Dashboard
3. Inventory page
4. Orders page
5. Create New Order page
6. Alerts page
7. Chat page

### What to say
“I will now show the flow end to end: inventory, order creation, tracking, prediction, alerts, and chat support.”

### Time
2 minutes

---

## Slide 20: Final Summary

### Title
Conclusion

### What to say
“This project combines inventory control, lifecycle tracking, and AI prediction in one platform. It helps the team manage eyewear orders faster, see risks early, and reduce SLA breaches. The system uses a Random Forest model for structured prediction and an LLM only for the chat layer.”

### Time
1 minute

---

## Speaker Tips

- Speak slowly and clearly
- Use the UI while explaining
- Keep the technical terms simple
- Say why each feature matters in business terms
- Mention that the model is trained on historical order data
- Mention that LLM is not used for prediction because the task is structured tabular ML

---

## Short Technical Summary You Can Reuse

“We built a React and FastAPI based eyewear order management system. The backend stores orders, inventory, and status history. The AI prediction module uses a Random Forest classifier trained on historical structured data to predict SLA breach risk. We do not use an LLM for prediction because the task is tabular and not language-based. The LLM is used only for the chat assistant, where it helps answer natural language questions using backend tools.”

