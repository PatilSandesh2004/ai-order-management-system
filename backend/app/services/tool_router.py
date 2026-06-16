import json

from groq import Groq

from app.config import chat_config


class ToolRouter:

    def __init__(self):

        self.client = Groq(
            api_key=chat_config.GROQ_API_KEY
        )

    def select_tool(
        self,
        question: str
    ):

        response = (
            self.client.chat.completions.create(
                model=chat_config.GROQ_ROUTER_MODEL,
                temperature=0,
               
                messages=[
                    {
                        "role": "system",
                        "content": """

You are a routing engine.

Return ONLY a valid JSON object.

Never call tools.
Never generate function calls.
Never generate tool invocations.
Never return markdown.
Never explain your answer.

Valid format:

{
  "tool": "OrderTools",
  "function": "get_active_orders"
}
Your job is to select the correct tool and function.

AVAILABLE TOOLS

Tool Class: OrderTools

Functions:

get_total_orders
    Returns total orders.

get_active_orders
    Returns active orders.

get_high_risk_orders
    Returns high risk orders.

--------------------------------------------------

Tool Class: InventoryTools

Functions:

get_low_stock_items
    Returns low stock inventory items.

get_inventory_count
    Returns inventory count.

--------------------------------------------------

Tool Class: DashboardTools

Functions:

get_dashboard_summary
    Returns dashboard KPIs and summary.

--------------------------------------------------

Tool Class: AnalyticsTools

Functions:

get_high_risk_count
    Returns high risk order count.

get_sla_breach_count
    Returns SLA breach count.

get_delivered_count
    Returns delivered orders count.

get_active_count
    Returns active orders count.

--------------------------------------------------

Return ONLY valid JSON.

Example:

{
    "tool": "OrderTools",
    "function": "get_active_orders"
}

OR

{
    "tool": "InventoryTools",
    "function": "get_low_stock_items"
}

Never explain.
Never return markdown.
Never return text outside JSON.
"""
                    },
                    {
                        "role": "user",
                        "content": question
                    }
                ]
            )
        )

        return json.loads(
            response
            .choices[0]
            .message
            .content
        )


tool_router = ToolRouter()