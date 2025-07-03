import React from 'react';
import { Typography, Paper, List, ListItem, ListItemText, Divider, Grid, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderSummary = ({ orderDetails }) => {
  if (!orderDetails) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">No order details to display.</Typography>
        <Typography>It seems you haven't placed an order yet, or the order details are missing.</Typography>
        <Button component={Link} to="/" variant="contained" sx={{mt: 2}}>
          Continue Shopping
        </Button>
      </Box>
    );
  }

  const { id, customerInfo, items, total, orderDate } = orderDetails;

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 2, mb: 4, maxWidth: '800px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Thank You For Your Order!
      </Typography>
      <Typography variant="h6" align="center" sx={{ mb: 1 }}>
        Order ID: {id}
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 3 }}>
        Order Placed: {new Date(orderDate).toLocaleString()}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Shipping Information:</Typography>
          <Typography><strong>Name:</strong> {customerInfo.name}</Typography>
          <Typography><strong>Email:</strong> {customerInfo.email}</Typography>
          <Typography><strong>Address:</strong> {customerInfo.address}</Typography>
          <Typography><strong>City:</strong> {customerInfo.city}, {customerInfo.postalCode}</Typography>
          <Typography><strong>Country:</strong> {customerInfo.country}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Payment Information:</Typography>
          <Typography><strong>Payment Method:</strong> {customerInfo.paymentMethod}</Typography>
          {/* In a real scenario, you might show last 4 digits of card, etc. */}
          <Typography color="text.secondary" sx={{mt: 1}}>
            (Payment processing details are typically not shown here for security reasons)
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        Order Items:
      </Typography>
      <List disablePadding>
        {items.map((item) => (
          <ListItem key={item.id} divider sx={{ py: 2 }}>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity} @ $${item.price.toFixed(2)} each`}
              primaryTypographyProps={{ fontWeight: 'medium' }}
            />
            <Typography variant="body1" fontWeight="medium">
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Order Total: ${total.toFixed(2)}
        </Typography>
      </Box>

      <Box textAlign="center" mt={4}>
        <Button component={Link} to="/" variant="contained" color="primary" size="large">
          Continue Shopping
        </Button>
      </Box>
    </Paper>
  );
};

export default OrderSummary;
