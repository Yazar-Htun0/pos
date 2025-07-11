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

---

ဤသည်မှာ Flask ကိုအသုံးပြု၍ ဖန်တီးထားသော အခြေခံ ရောင်းချမှတ်တမ်း (Point of Sale - POS) နှင့် ကုန်ပစ္စည်းစီမံခန့်ခွဲမှုစနစ် (Inventory Management System) ဖြစ်ပါသည်။ ဤစနစ်သည် ကုန်ပစ္စည်းများ စီမံခန့်ခွဲခြင်း၊ ရောင်းချမှုများ ပြုလုပ်ခြင်း၊ ရောင်းချမှုမှတ်တမ်းများ ကြည့်ရှုခြင်းတို့အတွက် RESTful API တစ်ခုကို ပံ့ပိုးပေးပါသည်။
အင်္ဂါရပ်များ
ကုန်ပစ္စည်း စီမံခန့်ခွဲမှု
 * ကုန်ပစ္စည်းအသစ်များကို သိုလှောင်ခန်းထဲသို့ ထည့်သွင်းခြင်း။
 * ရှိပြီးသား ကုန်ပစ္စည်း အရေအတွက်များကို အပ်ဒိတ်လုပ်ခြင်း။
 * လက်ရှိ ကုန်ပစ္စည်းစာရင်းကို ကြည့်ရှုခြင်း။
ရောင်းချမှု စီမံခန့်ခွဲမှု
 * လက်ရှိ ရောင်းချမှုထဲသို့ ကုန်ပစ္စည်းများ ထည့်သွင်းခြင်း။
 * လက်ရှိရောင်းချမှုအတွက် စုစုပေါင်းတန်ဖိုးကို တွက်ချက်ခြင်း။
 * ငွေပေးချေမှုများကို ပြုလုပ်ခြင်း။
 * ရောင်းချမှု မှတ်တမ်းများကို ကြည့်ရှုခြင်း။
စနစ် တပ်ဆင်ခြင်း
လိုအပ်ချက်များ
 * Python 3.x
 * pip (Python package installer)
Repository ကို Clone လုပ်ခြင်း (လိုအပ်ပါက)
git clone <repository_url>
cd <repository_directory>

Virtual Environment (အကြံပြုထားသည်)
python3 -m venv venv
source venv/bin/activate  # Windows တွင်: venv\\Scripts\\activate

Dependencies များ ထည့်သွင်းခြင်း
pip install -r requirements.txt

Application ကို Run ခြင်း
Flask development server ကို စတင်ရန် အောက်ပါ command ကို run ပါ။
python pos.py

Application ကို http://127.0.0.1:5000/ (သို့မဟုတ် http://localhost:5000/) တွင် ဝင်ရောက်ကြည့်ရှုနိုင်ပါသည်။
API Endpoints များ
Endpoints အားလုံးသည် JSON တုံ့ပြန်မှုများကို ပြန်လည်ပေးပို့ပါသည်။
ကုန်ပစ္စည်း စီမံခန့်ခွဲမှု
POST /add_product
Inventory ထဲသို့ ကုန်ပစ္စည်းအသစ် ထည့်သွင်းပါသည်။
Request Body:
{
    "id": "P001",
    "name": "Laptop",
    "price": 1200.00,
    "quantity": 10
}

Response:
{
    "message": "Product added successfully"
}

PUT /update_product
ရှိပြီးသား ကုန်ပစ္စည်းတစ်ခု၏ အရေအတွက်ကို အပ်ဒိတ်လုပ်ပါသည်။
Request Body:
{
    "id": "P001",
    "quantity": 5
}

Response:
{
    "message": "Product updated successfully"
}

GET /view_inventory
လက်ရှိ ကုန်ပစ္စည်းစာရင်းကို ပြသပါသည်။
Response:
{
    "P001": {
        "name": "Laptop",
        "price": 1200.00,
        "quantity": 15
    }
}

ရောင်းချမှု စီမံခန့်ခွဲမှု
POST /add_to_sale
လက်ရှိ ရောင်းချမှုထဲသို့ ကုန်ပစ္စည်းတစ်ခုကို ထည့်သွင်းပါသည်။
Request Body:
{
    "id": "P001",
    "quantity": 1
}

Response:
{
    "message": "Product added to sale"
}

GET /calculate_total
လက်ရှိ ရောင်းချမှုအတွက် စုစုပေါင်း တန်ဖိုးကို တွက်ချက်ပါသည်။
Response:
{
    "total": 1200.00
}

POST /process_payment
လက်ရှိ ရောင်းချမှုအတွက် ငွေပေးချေမှုကို ပြုလုပ်ပါသည်။ လက်ရှိ ရောင်းချမှုကို ရှင်းလင်းပြီး ရောင်းချမှုမှတ်တမ်းထဲသို့ ထည့်သွင်းပါသည်။
Request Body:
{
    "amount": 1500.00
}

Response:
{
    "message": "Payment processed successfully",
    "change": 300.00
}

GET /view_sales_history
ပြီးစီးခဲ့သော ရောင်းချမှုအားလုံးကို ကြည့်ရှုပါသည်။
Response:
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