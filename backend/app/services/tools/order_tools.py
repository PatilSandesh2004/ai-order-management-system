from app.models.order import Order


class OrderTools:

    @staticmethod
    def get_total_orders(db):

        total_orders = (
            db.query(Order)
            .count()
        )

        return f"""
        Total Orders: {total_orders}
        """

    @staticmethod
    def get_active_orders(db):

        active_orders = (
            db.query(Order)
            .filter(
                Order.status != "Delivered"
            )
            .count()
        )

        return f"""
        Active Orders: {active_orders}
        """

    @staticmethod
    def get_delivered_orders(db):

        delivered_orders = (
            db.query(Order)
            .filter(
                Order.status == "Delivered"
            )
            .count()
        )

        return f"""
        Delivered Orders: {delivered_orders}
        """

    @staticmethod
    def get_high_risk_orders(db):

        orders = (
            db.query(Order)
            .filter(
                Order.risk_score >= 70
            )
            .all()
        )

        return str([
            {
                "id": order.id,
                "customer_name": order.customer_name,
                "risk_score": order.risk_score,
                "status": order.status
            }
            for order in orders
        ])

    @staticmethod
    def get_sla_breached_orders(db):

        orders = (
            db.query(Order)
            .filter(
                Order.sla_breached == 1
            )
            .all()
        )

        return str([
            {
                "id": order.id,
                "customer_name": order.customer_name
            }
            for order in orders
        ])