from app.models.order import Order
from app.models.inventory import Inventory


class DashboardTools:

    @staticmethod
    def get_dashboard_summary(db):

        return {
            "total_orders":
                db.query(Order).count(),

            "active_orders":
                db.query(Order)
                .filter(
                    Order.status != "Delivered"
                )
                .count(),

            "delivered_orders":
                db.query(Order)
                .filter(
                    Order.status == "Delivered"
                )
                .count(),

            "high_risk_orders":
                db.query(Order)
                .filter(
                    Order.risk_score >= 70
                )
                .count(),

            "low_stock_items":
                db.query(Inventory)
                .filter(
                    Inventory.quantity < 5
                )
                .count()
        }