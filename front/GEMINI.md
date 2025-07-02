# GEMINI.md for POS and Inventory Management System

This `GEMINI.md` file provides context and guidelines for developing a frontend for a Flask-based Point of Sale (POS) and Inventory Management System. The goal is to create a user-friendly interface using jQuery, HTML, and CSS, specifically incorporating barcode scanning for adding products to both inventory and sales.

---

## 1. Project Context

This project involves building the **frontend interface** for an existing Flask RESTful API. The API handles product management (add, update, view inventory) and sale management (add to sale, calculate total, process payment, view sales history).

The primary focus for this frontend development is to provide a seamless user experience, with a strong emphasis on **barcode integration** for efficiency.

---

## 2. Frontend Technologies

* **HTML5:** For structuring the web pages.
* **CSS3:** For styling and visual presentation.
* **jQuery:** For DOM manipulation, event handling, and making AJAX requests to the Flask API.
* **Barcode Scanner Integration:** The frontend should be capable of reading barcode inputs (simulated or real-time if a scanner is connected) to quickly identify and add products.

---

## 3. Core Features to Implement (Frontend)

The frontend should provide intuitive interfaces for the following functionalities:

### 3.1. Product Management Interface

* **Add New Product:**
    * A form to input `id`, `name`, `price`, and `quantity`.
    * **Crucially, incorporate a barcode input field** for the `id`. When a barcode is scanned, its value should populate the `id` field.
    * Button to send `POST /add_product` request.
* **Update Product Quantity:**
    * A form to input `id` and `quantity`.
    * **Barcode input for `id`** should be available here as well.
    * Button to send `PUT /update_product` request.
* **View Inventory:**
    * Display a table or list of all products in inventory, showing `id`, `name`, `price`, and `quantity`.
    * This should make a `GET /view_inventory` request and dynamically render the data.

### 3.2. Sale Management Interface

* **Create New Sale:**
    * A section to display the current sale items.
    * An input field for **barcode scanning** to add products to the current sale. When a barcode is scanned, the corresponding product (if found in inventory) should be added to the sale (sending `POST /add_to_sale`). The quantity should default to 1, but allow for manual adjustment if needed.
    * Display the `current total` by making `GET /calculate_total` requests frequently (e.g., after each item is added).
    * Option to **remove items** from the current sale if a mistake is made (though the backend API doesn't directly support this, consider how to handle it on the frontend by adjusting quantities or re-adding with negative quantity if the API allows).
* **Process Payment:**
    * An input field for the `amount` paid by the customer.
    * Display `total` and `change` (after `POST /process_payment`).
    * Button to finalize the sale.
* **View Sales History:**
    * A page or section to display all completed sales.
    * This should make a `GET /view_sales_history` request and render the sales data in a readable format.

---

## 4. Design Guidelines

* **Clean and Intuitive UI:** The interface should be simple, easy to navigate, and visually appealing.
* **Responsiveness:** While not strictly required for a basic POS, consider basic responsiveness for different screen sizes.
* **Feedback Mechanisms:** Provide clear feedback to the user for successful operations (e.g., "Product added successfully") and errors (e.g., "Product not found").
* **Barcode Focus:** The barcode input fields should automatically gain focus when the relevant section is active to streamline scanning.

---

## 5. API Endpoints Reference

The frontend will interact with the following API endpoints provided by the Flask backend:

### Product Management
* `POST /add_product`
    * Request: `{ "id": "P001", "name": "Laptop", "price": 1200.00, "quantity": 10 }`
* `PUT /update_product`
    * Request: `{ "id": "P001", "quantity": 5 }`
* `GET /view_inventory`

### Sale Management
* `POST /add_to_sale`
    * Request: `{ "id": "P001", "quantity": 1 }`
* `GET /calculate_total`
* `POST /process_payment`
    * Request: `{ "amount": 1500.00 }`
* `GET /view_sales_history`

---

## 6. General Instructions for Gemini CLI

When generating code or suggestions, ensure they adhere to the following:

* **jQuery Best Practices:** Use standard jQuery syntax for DOM manipulation and AJAX calls.
* **Semantic HTML:** Write clean and semantic HTML structure.
* **Separation of Concerns:** Keep HTML, CSS, and JavaScript well-separated (e.g., `index.html`, `style.css`, `script.js`).
* **Error Handling:** Include basic error handling for API calls (e.g., `$.ajax().fail()`).
* **Clarity and Readability:** Code should be well-commented and easy to understand.
* **Focus on the specified features:** Prioritize implementing the outlined features, especially the barcode integration aspect.
* **Simulate Barcode Input:** Since a physical scanner might not be available during development, provide guidance on how to simulate barcode input (e.g., an input field that triggers an event on `enter` key press or on blur).


