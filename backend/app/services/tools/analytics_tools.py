from app.models.order import Order


class AnalyticsTools:

    @staticmethod
    def get_high_risk_count(db):

        return (
            db.query(Order)
            .filter(
                Order.risk_score >= 70
            )
            .count()
        )

    @staticmethod
    def get_sla_breach_count(db):

        return (
            db.query(Order)
            .filter(
                Order.sla_breached == 1
            )
            .count()
        )

    @staticmethod
    def get_delivered_count(db):

        return (
            db.query(Order)
            .filter(
                Order.status == "Delivered"
            )
            .count()
        )

    @staticmethod
    def get_active_count(db):

        count = (
            db.query(Order)
            .filter(
                Order.status != "Delivered"
            )
            .count()
        )

        return f"Active Orders Count: {count}"