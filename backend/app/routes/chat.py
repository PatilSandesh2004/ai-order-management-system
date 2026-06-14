from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.chat import (
    ChatRequest,
    ChatResponse
)

from app.services.groq_service import (
    groq_service
)

from app.services.tool_router import (
    tool_router
)

from app.services.tools.order_tools import (
    OrderTools
)

from app.services.tools.inventory_tools import (
    InventoryTools
)

from app.services.tools.dashboard_tools import (
    DashboardTools
)

from app.services.tools.analytics_tools import (
    AnalyticsTools
)

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post(
    "/",
    response_model=ChatResponse
)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db)
):

    routing = tool_router.select_tool(
        request.question
    )

    print("Routing:", routing)

    tool_name = routing["tool"]

    function_name = routing["function"]

    context = ""

    if tool_name == "OrderTools":

        if hasattr(
            OrderTools,
            function_name
        ):

            context = getattr(
                OrderTools,
                function_name
            )(db)

        else:

            context = (
                f"Function {function_name} not found in OrderTools"
            )

    elif tool_name == "InventoryTools":

        if hasattr(
            InventoryTools,
            function_name
        ):

            context = getattr(
                InventoryTools,
                function_name
            )(db)

        else:

            context = (
                f"Function {function_name} not found in InventoryTools"
            )

    elif tool_name == "DashboardTools":

        if hasattr(
            DashboardTools,
            function_name
        ):

            context = getattr(
                DashboardTools,
                function_name
            )(db)

        else:

            context = (
                f"Function {function_name} not found in DashboardTools"
            )

    elif tool_name == "AnalyticsTools":

        if hasattr(
            AnalyticsTools,
            function_name
        ):

            context = getattr(
                AnalyticsTools,
                function_name
            )(db)

        else:

            context = (
                f"Function {function_name} not found in AnalyticsTools"
            )

    else:

        context = (
            f"Unknown tool: {tool_name}"
        )

    print("Context:", context)

    answer = (
        groq_service.generate_response(
            question=request.question,
            context=str(context)
        )
    )

    return ChatResponse(
        answer=answer
    )