# Point of Sale (POS) and Inventory Management System

This is a basic Point of Sale (POS) and Inventory Management system implemented using Flask. It provides a RESTful API for managing products, processing sales, and viewing sales history.

## Features

*   **Product Management:**
    *   Add new products to inventory.
    *   Update existing product quantities.
    *   View current inventory.
*   **Sale Management:**
    *   Add products to a sale.
    *   Calculate the total for the current sale.
    *   Process payments.
    *   View sales history.

## Setup

1.  **Prerequisites:**
    *   Python 3.x
    *   pip (Python package installer)

2.  **Clone the repository (if applicable):**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

3.  **Create a virtual environment (recommended):**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

4.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## Running the Application

To start the Flask development server, run:

```bash
python pos.py
```

The application will be accessible at `http://127.0.0.1:5000/` (or `http://localhost:5000/`).

## API Endpoints

All endpoints return JSON responses.

### Product Management

#### `POST /add_product`

Adds a new product to the inventory.

**Request Body:**

```json
{
    "id": "P001",
    "name": "Laptop",
    "price": 1200.00,
    "quantity": 10
}
```

**Response:**

```json
{
    "message": "Product added successfully"
}
```

#### `PUT /update_product`

Updates the quantity of an existing product.

**Request Body:**

```json
{
    "id": "P001",
    "quantity": 5
}
```

**Response:**

```json
{
    "message": "Product updated successfully"
}
```

#### `GET /view_inventory`

Displays the current inventory.

**Response:**

```json
{
    "P001": {
        "name": "Laptop",
        "price": 1200.00,
        "quantity": 15
    }
}
```

### Sale Management

#### `POST /add_to_sale`

Adds a product to the current sale.

**Request Body:**

```json
{
    "id": "P001",
    "quantity": 1
}
```

**Response:**

```json
{
    "message": "Product added to sale"
}
```

#### `GET /calculate_total`

Calculates the total for the current sale.

**Response:**

```json
{
    "total": 1200.00
}
```

#### `POST /process_payment`

Processes payment for the current sale. Clears the current sale and adds it to sales history.

**Request Body:**

```json
{
    "amount": 1500.00
}
```

**Response:**

```json
{
    "message": "Payment processed successfully",
    "change": 300.00
}
```

#### `GET /view_sales_history`

Views all completed sales.

**Response:**

```json
[
    {
        "items": [
            {
                "id": "P001",
                "name": "Laptop",
                "price": 1200.00,
                "quantity": 1
            }
        ],
        "total": 1200.00,
        "payment_amount": 1500.00
    }
]
```