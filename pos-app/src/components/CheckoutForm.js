import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const CheckoutForm = ({ onSubmitOrder }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'Credit Card', // Default payment method
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
    // Basic real-time validation clear
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!customerInfo.name.trim()) tempErrors.name = "Name is required.";
    if (!customerInfo.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      tempErrors.email = "Email is not valid.";
    }
    if (!customerInfo.address.trim()) tempErrors.address = "Address is required.";
    if (!customerInfo.city.trim()) tempErrors.city = "City is required.";
    if (!customerInfo.postalCode.trim()) {
        tempErrors.postalCode = "Postal code is required.";
    } else if (!/^\d{5}(-\d{4})?$/.test(customerInfo.postalCode) && customerInfo.country === "USA") { // Example for USA
        tempErrors.postalCode = "Invalid postal code format for USA (e.g., 12345 or 12345-6789).";
    }
    if (!customerInfo.country.trim()) tempErrors.country = "Country is required.";
    if (!customerInfo.paymentMethod) tempErrors.paymentMethod = "Payment method is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmitOrder(customerInfo);
      // Optionally clear form or show success message handled by App.js
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2, mb: 4 }}>
      <Typography variant="h5" gutterBottom component="div" sx={{ mb: 2 }}>
        Shipping & Payment Information
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              name="name"
              value={customerInfo.name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={customerInfo.email}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Street Address"
              name="address"
              value={customerInfo.address}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              name="city"
              value={customerInfo.city}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Postal Code"
              name="postalCode"
              value={customerInfo.postalCode}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.postalCode}
              helperText={errors.postalCode}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField // In a real app, this might be a Select with predefined countries
              label="Country"
              name="country"
              value={customerInfo.country}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.country}
              helperText={errors.country}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required error={!!errors.paymentMethod}>
              <InputLabel id="payment-method-label">Payment Method</InputLabel>
              <Select
                labelId="payment-method-label"
                id="paymentMethod"
                name="paymentMethod"
                value={customerInfo.paymentMethod}
                label="Payment Method"
                onChange={handleChange}
              >
                <MenuItem value="Credit Card">Credit Card</MenuItem>
                <MenuItem value="PayPal">PayPal</MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
              </Select>
              {errors.paymentMethod && <Typography color="error" variant="caption">{errors.paymentMethod}</Typography>}
            </FormControl>
          </Grid>
          {/* Payment details (e.g. card number) would go here, ideally using a secure payment integration */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Place Order
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default CheckoutForm;
