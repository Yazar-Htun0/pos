import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Button, TextField, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';

const ShoppingCart = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const quantityNum = parseInt(newQuantity, 10);
    if (quantityNum >= 0) { // Allow setting to 0, which could then be removed or handled as such
      onUpdateQuantity(itemId, quantityNum);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty. <Button component={Link} to="/">Go Shopping</Button></Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <ListItem
                key={item.id}
                divider
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => onRemoveFromCart(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.name}
                  secondary={`Price: $${item.price.toFixed(2)}`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1} // Optionally disable if quantity is 1, or remove if 0
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    sx={{ width: '50px', mx: 1 }}
                    size="small"
                  />
                  <IconButton size="small" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Typography variant="subtitle1" sx={{ minWidth: '80px', textAlign: 'right' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </ListItem>
            ))}
            <ListItem>
              <ListItemText primaryTypographyProps={{variant: "h6"}}><strong>Total:</strong></ListItemText>
              <Typography variant="h6"><strong>${getTotalPrice()}</strong></Typography>
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
            sx={{ mt: 2 }}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Box>
  );
};

export default ShoppingCart;
