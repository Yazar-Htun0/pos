import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box, Snackbar, Alert } from '@mui/material';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';
import './App.css';

function AppContent() { // Renamed to AppContent to use useNavigate
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [order, setOrder] = useState(() => {
    const savedOrder = localStorage.getItem('currentOrder');
    return savedOrder ? JSON.parse(savedOrder) : null;
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (order) {
      localStorage.setItem('currentOrder', JSON.stringify(order));
    } else {
      localStorage.removeItem('currentOrder');
    }
  }, [order]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setSnackbar({ open: true, message: `${product.name} added to cart!`, severity: 'success' });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    setSnackbar({ open: true, message: 'Item removed from cart.', severity: 'info' });
  };

  const handleUpdateQuantity = (productId, quantity) => {
    const newQuantity = Math.max(0, quantity); // Ensure quantity is not negative
    setCartItems((prevItems) => {
      if (newQuantity === 0) {
        return prevItems.filter((item) => item.id !== productId); // Remove item if quantity is 0
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleSubmitOrder = (customerInfo) => {
    if (cartItems.length === 0) {
      setSnackbar({ open: true, message: 'Your cart is empty. Cannot place order.', severity: 'warning' });
      return;
    }
    const newOrder = {
      id: `order_${new Date().getTime()}`, // Simple unique ID
      customerInfo,
      items: [...cartItems], // Create a copy of cart items for the order
      total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      orderDate: new Date().toISOString(),
    };
    setOrder(newOrder);
    setCartItems([]); // Clear cart
    // In a real app, you'd also save this to a backend
    // and potentially clear localStorage for cartItems here or after successful payment
    // For now, we rely on useEffect to clear cartItems from localStorage
    setSnackbar({ open: true, message: 'Order placed successfully!', severity: 'success' });
    navigate('/order-summary');
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
            POS System
          </Typography>
          <Button color="inherit" component={Link} to="/">Products</Button>
          <Button color="inherit" component={Link} to="/cart">Cart ({totalCartItems})</Button>
          <Button color="inherit" component={Link} to="/checkout">Checkout</Button>
          {order && <Button color="inherit" component={Link} to="/order-summary">Order Summary</Button>}
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 2 }}>
        <Routes>
          <Route path="/" element={<ProductList onAddToCart={handleAddToCart} />} />
          <Route
            path="/cart"
            element={
              <ShoppingCart
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              cartItems.length > 0 ?
              <CheckoutForm onSubmitOrder={handleSubmitOrder} /> :
              <Box textAlign="center" mt={5}>
                <Typography variant="h6">Your cart is empty. Please add items to your cart before proceeding to checkout.</Typography>
                <Button component={Link} to="/" variant="contained" sx={{mt: 2}}>Go to Products</Button>
              </Box>
            }
          />
          <Route
            path="/order-summary"
            element={order ? <OrderSummary orderDetails={order} /> : <Typography>No current order to display. Please complete checkout first.</Typography>}
          />
        </Routes>
      </Container>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

// Wrap AppContent with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
