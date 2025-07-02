$(document).ready(function() {
    const API_BASE_URL = 'http://127.0.0.1:5000'; // Assuming Flask API runs on this address

    // Helper function to display messages
    function showMessage(message, type = 'success') {
        const msgDiv = $('<div>').text(message).addClass('message').addClass(type);
        $('body').append(msgDiv);
        msgDiv.fadeIn(300).delay(3000).fadeOut(300, function() {
            $(this).remove();
        });
    }

    // Set initial focus on the add product barcode input
    $('#barcode-add').focus();

    // --- Product Management ---

    // Add New Product
    $('#add-product-btn').on('click', function() {
        const id = $('#barcode-add').val();
        const name = $('#product-name').val();
        const price = parseFloat($('#product-price').val());
        const quantity = parseInt($('#product-quantity').val());

        if (!id || !name || isNaN(price) || isNaN(quantity)) {
            showMessage('Please fill all product fields correctly.', 'error');
            return;
        }

        $.ajax({
            url: `${API_BASE_URL}/add_product`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id, name, price, quantity }),
            success: function(response) {
                showMessage(response.message);
                $('#barcode-add, #product-name, #product-price, #product-quantity').val('');
                loadInventory(); // Refresh inventory after adding
            },
            error: function(xhr) {
                showMessage('Error adding product: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Unknown error'), 'error');
            }
        });
    });

    // Barcode scanning for Add New Product
    $('#barcode-add').on('keypress', function(e) {
        if (e.which === 13) { // Enter key pressed
            $('#add-product-btn').click();
        }
    });

    // Update Product Quantity
    $('#update-quantity-btn').on('click', function() {
        const id = $('#barcode-update').val();
        const quantity = parseInt($('#update-quantity').val());

        if (!id || isNaN(quantity)) {
            showMessage('Please enter product ID and valid quantity.', 'error');
            return;
        }

        $.ajax({
            url: `${API_BASE_URL}/update_product`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ id, quantity }),
            success: function(response) {
                showMessage(response.message);
                $('#barcode-update, #update-quantity').val('');
                loadInventory(); // Refresh inventory after updating
            },
            error: function(xhr) {
                showMessage('Error updating product: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Unknown error'), 'error');
            }
        });
    });

    // Barcode scanning for Update Product Quantity
    $('#barcode-update').on('keypress', function(e) {
        if (e.which === 13) { // Enter key pressed
            $('#update-quantity-btn').click();
        }
    });

    // View Inventory
    $('#view-inventory-btn').on('click', loadInventory);

    function loadInventory() {
        console.log('Attempting to load inventory...');
        $.ajax({
            url: `${API_BASE_URL}/view_inventory`,
            type: 'GET',
            success: function(products) {
                console.log('Inventory loaded successfully:', products);
                const inventoryList = $('#inventory-list');
                inventoryList.empty();
                if (products.length === 0) {
                    inventoryList.append('<p>No products in inventory.</p>');
                    return;
                }
                const table = $('<table>');
                table.append('<thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Quantity</th></tr></thead>');
                const tbody = $('<tbody>');
                products.forEach(product => {
                    tbody.append(`<tr><td>${product.id}</td><td>${product.name}</td><td>${product.price.toFixed(2)}</td><td>${product.quantity}</td></tr>`);
                });
                table.append(tbody);
                inventoryList.append(table);
            },
            error: function(xhr) {
                console.error('Error loading inventory:', xhr);
                showMessage('Error loading inventory: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Unknown error'), 'error');
            }
        });
    }

    // --- Sale Management ---

    let currentSaleItems = {}; // {id: {name, price, quantity}}

    // Barcode scanning for adding to sale
    $('#barcode-sale').on('keypress', function(e) {
        if (e.which === 13) { // Enter key pressed
            const id = $(this).val();
            if (id) {
                // First, check if the product exists in inventory (simulated)
                $.ajax({
                    url: `${API_BASE_URL}/view_inventory`,
                    type: 'GET',
                    success: function(products) {
                        const product = products.find(p => p.id === id);
                        if (product) {
                            addToSale(product, 1); // Add 1 quantity by default
                            $('#barcode-sale').val(''); // Clear input after scanning
                        } else {
                            showMessage('Product not found in inventory.', 'error');
                        }
                    },
                    error: function(xhr) {
                        showMessage('Error checking inventory: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Unknown error'), 'error');
                    }
                });
            }
        }
    });

    function addToSale(product, quantityToAdd) {
        // Update local sale items
        if (currentSaleItems[product.id]) {
            currentSaleItems[product.id].quantity += quantityToAdd;
        } else {
            currentSaleItems[product.id] = { ...product, quantity: quantityToAdd };
        }

        // Send to backend (only product ID and quantity)
        $.ajax({
            url: `${API_BASE_URL}/add_to_sale`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id: product.id, quantity: quantityToAdd }),
            success: function(response) {
                showMessage(response.message || `Added ${product.name} to sale.`);
                updateCurrentSaleDisplay();
                loadInventory(); // Refresh inventory to reflect reduced stock
            },
            error: function(xhr) {
                // If backend fails, revert local change
                if (currentSaleItems[product.id].quantity - quantityToAdd <= 0) {
                    delete currentSaleItems[product.id];
                } else {
                    currentSaleItems[product.id].quantity -= quantityToAdd;
                }
                showMessage('Error adding to sale: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Unknown error'), 'error');
                updateCurrentSaleDisplay(); // Revert display
            }
        });
    }

    function removeFromSale(id) {
        // This is a frontend-only removal as the backend API does not support removing items from a sale directly.
        // If you need backend synchronization for removals, the API would need to be extended.
        if (currentSaleItems[id]) {
            const removedProduct = currentSaleItems[id];
            delete currentSaleItems[id];
            showMessage(`Removed ${removedProduct.name} from current sale (frontend only).`);
            updateCurrentSaleDisplay();
            // Optionally, you might want to update inventory on the backend if this removal implies returning stock.
            // This would require a new backend API endpoint (e.g., PUT /update_product with negative quantity).
        }
    }

    function updateCurrentSaleDisplay() {
        const saleItemsList = $('#sale-items');
        saleItemsList.empty();
        let frontendTotal = 0;

        for (const id in currentSaleItems) {
            const item = currentSaleItems[id];
            frontendTotal += item.price * item.quantity;
            const listItem = $('<li>').html(`
                ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
                <button class="btn remove-item-btn" data-id="${item.id}">Remove</button>
            `);
            saleItemsList.append(listItem);
        }

        // Fetch current total from API to ensure backend consistency
        $.ajax({
            url: `${API_BASE_URL}/calculate_total`,
            type: 'GET',
            success: function(response) {
                $('#sale-total').text(response.total.toFixed(2));
            },
            error: function(xhr) {
                showMessage('Error calculating total: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Unknown error'), 'error');
                $('#sale-total').text('Error');
            }
        });

        // Add event listener for remove buttons
        $('.remove-item-btn').off('click').on('click', function() {
            const idToRemove = $(this).data('id');
            removeFromSale(idToRemove);
        });

        if (Object.keys(currentSaleItems).length === 0) {
            saleItemsList.append('<li>No items in current sale.</li>');
        }
    }

    // Process Payment
    $('#process-payment-btn').on('click', function() {
        const amount = parseFloat($('#amount-paid').val());

        if (isNaN(amount) || amount <= 0) {
            showMessage('Please enter a valid amount paid.', 'error');
            return;
        }

        $.ajax({
            url: `${API_BASE_URL}/process_payment`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amount }),
            success: function(response) {
                showMessage(response.message + ` Change: ${response.change.toFixed(2)}`);
                $('#amount-paid').val('');
                currentSaleItems = {}; // Clear local sale items after payment
                updateCurrentSaleDisplay(); // Clear sale display
                loadSalesHistory(); // Refresh sales history
            },
            error: function(xhr) {
                showMessage('Error processing payment: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Unknown error'), 'error');
            }
        });
    });

    // View Sales History
    $('#view-history-btn').on('click', loadSalesHistory);

    function loadSalesHistory() {
        $.ajax({
            url: `${API_BASE_URL}/view_sales_history`,
            type: 'GET',
            success: function(history) {
                const salesHistoryList = $('#sales-history-list');
                salesHistoryList.empty();
                if (history.length === 0) {
                    salesHistoryList.append('<p>No sales history available.</p>');
                    return;
                }
                history.forEach(sale => {
                    const saleDiv = $('<div>').addClass('sale-record');
                    saleDiv.append(`<h4>Sale ID: ${sale.sale_id}</h4>`);
                    saleDiv.append(`<p>Total: ${sale.total.toFixed(2)}</p>`);
                    saleDiv.append(`<p>Amount Paid: ${sale.amount_paid.toFixed(2)}</p>`);
                    saleDiv.append(`<p>Change: ${sale.change.toFixed(2)}</p>`);
                    saleDiv.append(`<p>Date: ${new Date(sale.timestamp * 1000).toLocaleString()}</p>`);
                    salesHistoryList.append(saleDiv);
                });
            },
            error: function(xhr) {
                showMessage('Error loading sales history: ' + (xhr.responseJSON ? xhr.responseJSON.error : 'Unknown error'), 'error');
            }
        });
    }

    // Initial load of inventory and sales history (if desired on page load)
    loadInventory();
    loadSalesHistory();
});