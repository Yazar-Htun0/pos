import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CardActions, TextField, Box, CircularProgress } from '@mui/material';

// Expanded sample product data with descriptions
const initialProducts = [
  { id: 1, name: 'Laptop Pro', price: 1200.99, image: 'https://via.placeholder.com/300x200/FFA07A/000000?text=Laptop+Pro', description: 'High-performance laptop for professionals.' },
  { id: 2, name: 'Wireless Mouse', price: 25.50, image: 'https://via.placeholder.com/300x200/20B2AA/FFFFFF?text=Wireless+Mouse', description: 'Ergonomic wireless mouse with long battery life.' },
  { id: 3, name: 'Mechanical Keyboard', price: 75.00, image: 'https://via.placeholder.com/300x200/778899/FFFFFF?text=Mechanical+Keyboard', description: 'RGB mechanical keyboard with customizable keys.' },
  { id: 4, name: '4K Monitor', price: 399.99, image: 'https://via.placeholder.com/300x200/FFD700/000000?text=4K+Monitor', description: '27-inch 4K UHD monitor with vibrant colors.' },
  { id: 5, name: 'USB-C Hub', price: 45.00, image: 'https://via.placeholder.com/300x200/ADFF2F/000000?text=USB-C+Hub', description: 'Multi-port USB-C hub for all your devices.' },
  { id: 6, name: 'Webcam HD', price: 60.25, image: 'https://via.placeholder.com/300x200/FF69B4/FFFFFF?text=Webcam+HD', description: '1080p HD webcam for clear video calls.' },
  { id: 7, name: 'Gaming Headset', price: 99.99, image: 'https://via.placeholder.com/300x200/8A2BE2/FFFFFF?text=Gaming+Headset', description: 'Comfortable gaming headset with surround sound.' },
  { id: 8, name: 'Smartphone X', price: 799.00, image: 'https://via.placeholder.com/300x200/D2691E/FFFFFF?text=Smartphone+X', description: 'Latest generation smartphone with amazing camera.' },
  { id: 9, name: 'Tablet Lite', price: 299.50, image: 'https://via.placeholder.com/300x200/6495ED/FFFFFF?text=Tablet+Lite', description: 'Lightweight tablet perfect for media consumption.' },
];

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate API call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(initialProducts);
      setLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading products...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom component="div" sx={{ mb: 2 }}>
        Our Products
      </Typography>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
      />
      {filteredProducts.length === 0 && !loading && (
        <Typography>No products found matching your search criteria.</Typography>
      )}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                height="200" // Increased height for better visuals
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover' }} // Ensures image covers the area well
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div"> {/* Changed to h6 for better hierarchy */}
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {product.description}
                </Typography>
                <Typography variant="h5" color="primary"> {/* Price more prominent */}
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb:2 }}>
                <Button
                  variant="contained"
                  onClick={() => onAddToCart(product)}
                  size="large" // Made button larger
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
