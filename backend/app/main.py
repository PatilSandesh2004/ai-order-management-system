# from fastapi import FastAPI

# from app.routes.prediction import router as prediction_router
# from app.routes.orders import router as orders_router
# from app.routes.inventory import router as inventory_router
# from app.routes.dashboard import router as dashboard_router
# from app.routes.alerts import router as alerts_router
# from fastapi.middleware.cors import CORSMiddleware
# from app.routes.analytics import router as analytics_router
# from app.routes.reports import router as reports_router
# app = FastAPI(
#     title="AI Order Management System"
# )
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(prediction_router)
# app.include_router(dashboard_router)
# app.include_router(orders_router)
# app.include_router(inventory_router)
# app.include_router(alerts_router)
# app.include_router(analytics_router)
# app.include_router(reports_router)



# @app.get("/")
# def health_check():
#     return {
#         "status": "running"
#     }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.prediction import router as prediction_router
from app.routes.orders import router as orders_router
from app.routes.inventory import router as inventory_router
from app.routes.dashboard import router as dashboard_router
from app.routes.alerts import router as alerts_router
from app.routes.analytics import router as analytics_router
from app.routes.reports import router as reports_router
from app.routes.chat import (
    router as chat_router
)
app = FastAPI(
    title="AI Order Management System"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(prediction_router)
app.include_router(dashboard_router)
app.include_router(orders_router)
app.include_router(inventory_router)
app.include_router(alerts_router)
app.include_router(analytics_router)
app.include_router(reports_router)
app.include_router(chat_router)

@app.get("/")
def health_check():
    return {
        "status": "running"
    }
