from app.models.inventory import Inventory


class InventoryTools:

    @staticmethod
    def get_inventory_count(db):

        count = (
            db.query(Inventory)
            .count()
        )

        return f"""
        Inventory Items: {count}
        """

    @staticmethod
    def get_low_stock_items(db):

        items = (
            db.query(Inventory)
            .filter(
                Inventory.quantity < 5
            )
            .all()
        )

        return str([
            {
                "lens_type": item.lens_type,
                "lens_index": item.lens_index,
                "power": item.power,
                "coating": item.coating,
                "quantity": item.quantity
            }
            for item in items
        ])