"""
"I need to build a basic Point of Sale (POS) and Inventory Management system using Python. I'm looking for a command-line application for now. Can you help me set up the core structure for this system?
Specifically, I'd like to implement the following features:
 * For the POS:
   * Ability to add products to a sale by entering a product ID or name.
   * Calculate the total for the current sale.
   * Process payment (simple input for now, no actual payment gateway).
   * Update inventory after a sale.
 * For Inventory Management:
   * Display current inventory (product ID, name, price, quantity).
   * Add new products to inventory.
   * Update existing product quantities (e.g., when new stock arrives).
Can you provide the Python Flask code for this structure, along with explanations for each part?"
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)
# In-memory storage for products and sales
products = {}
current_sale = []
sales_history = []
@app.route('/add_product', methods=['POST'])
def add_product():
    """Add a new product to the inventory."""
    data = request.json
    product_id = data.get('id')
    name = data.get('name')
    price = data.get('price')
    quantity = data.get('quantity', 0)

    if not all([product_id, name, price]) or quantity is None:
        return jsonify({"error": "Missing product information"}), 400

    products[product_id] = {
        'name': name,
        'price': price,
        'quantity': quantity
    }
    return jsonify({"message": "Product added successfully"}), 201
@app.route('/update_product', methods=['PUT'])
def update_product():
    """Update an existing product's quantity."""
    data = request.json
    product_id = data.get('id')
    quantity = data.get('quantity')

    if product_id not in products or quantity is None:
        return jsonify({"error": "Product not found or invalid quantity"}), 400

    products[product_id]['quantity'] += quantity
    return jsonify({"message": "Product updated successfully"}), 200
@app.route('/view_inventory', methods=['GET'])
def view_inventory():
    """Display the current inventory."""
    return jsonify(products), 200
@app.route('/add_to_sale', methods=['POST'])
def add_to_sale():
    """Add a product to the current sale."""
    data = request.json
    product_id = data.get('id')
    quantity = data.get('quantity', 1)

    if product_id not in products or products[product_id]['quantity'] < quantity:
        return jsonify({"error": "Product not available or insufficient quantity"}), 400

    sale_item = {
        'id': product_id,
        'name': products[product_id]['name'],
        'price': products[product_id]['price'],
        'quantity': quantity
    }
    current_sale.append(sale_item)
    products[product_id]['quantity'] -= quantity
    return jsonify({"message": "Product added to sale"}), 200
@app.route('/calculate_total', methods=['GET'])
def calculate_total():
    """Calculate the total for the current sale."""
    total = sum(item['price'] * item['quantity'] for item in current_sale)
    return jsonify({"total": total}), 200
@app.route('/process_payment', methods=['POST'])
def process_payment():
    """Process payment for the current sale."""
    data = request.json
    payment_amount = data.get('amount')

    if payment_amount is None or payment_amount < 0:
        return jsonify({"error": "Invalid payment amount"}), 400

    total = sum(item['price'] * item['quantity'] for item in current_sale)

    if payment_amount < total:
        return jsonify({"error": "Insufficient payment"}), 400

    import datetime
    sales_history.append({"items": list(current_sale), "total": total, "payment_amount": payment_amount, "timestamp": datetime.datetime.now().isoformat()})
    current_sale.clear()
    return jsonify({"message": "Payment processed successfully", "change": payment_amount - total}), 200

@app.route('/view_sales_history', methods=['GET'])
def view_sales_history():
    """View all sales made."""
    return jsonify(sales_history), 200

@app.route('/sales_report_daily', methods=['GET'])
def sales_report_daily():
    """Generate a daily sales report."""
    daily_sales = {}
    for sale in sales_history:
        sale_date = sale['timestamp'].split('T')[0]
        if sale_date not in daily_sales:
            daily_sales[sale_date] = 0
        daily_sales[sale_date] += sale['total']
    return jsonify(daily_sales), 200

@app.route('/inventory_report', methods=['GET'])
def inventory_report():
    """Generate an inventory report."""
    return jsonify(products), 200

@app.route('/delete_product/<string:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """Delete a product from the inventory."""
    if product_id in products:
        del products[product_id]
        return jsonify({"message": "Product deleted successfully"}), 200
    return jsonify({"error": "Product not found"}), 404

@app.route('/clear_sale', methods=['POST'])
def clear_sale():
    """Clear the current sale."""
    current_sale.clear()
    return jsonify({"message": "Current sale cleared"}), 200

if __name__ == '__main__':
    app.run(debug=True)
# This code sets up a basic POS and Inventory Management system using Flask.
# It includes endpoints for adding products, updating inventory, processing
# sales, and calculating totals.
# The in-memory storage is used for simplicity, but in a production system,
# you would typically use a database to persist data.
# The application can be run with Flask, and you can test the endpoints using
# tools like Postman or curl.
# Note: This is a basic implementation and does not include error handling,
# authentication, or advanced features like user management or reporting.
# You can extend this code further by adding features like user authentication,
# advanced reporting, or integrating with a real payment gateway.
# This code is a starting point for building a more comprehensive POS and
# Inventory Management system.
# You can run this application by saving it to a file (e.g., pos.py) and
# executing it with Python. Make sure you have Flask and Flask-CORS installed.
# You can install them using pip:
# pip install Flask Flask-CORS
# After running the application, you can access the endpoints via HTTP
# requests.
# For example, you can use curl or Postman to test the endpoints.
# This code is structured to be modular and easy to extend.
# You can add more features or modify existing ones as needed.
# Remember to handle exceptions and edge cases in a production environment.
# This code is a basic implementation and can be improved with better error
# handling, logging, and validation.
# You can also consider using a database like SQLite or PostgreSQL for
# persistent storage instead of in-memory dictionaries.
# This will allow you to store data across application restarts.
# Additionally, you can implement user authentication and authorization
# to secure the endpoints and restrict access to certain features.
# You can also consider adding a user interface (UI) using a web framework
# like React or Vue.js to make the application more user-friendly.
