// server.js - Starter Express server for Week 2 assignment



// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});


// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// POST /api/products - Create a new product

app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  newProduct.id = uuidv4();
  products.push(newProduct);
  res.status(201).json(newProduct);
});


// PUT /api/products/:id - Update a product

app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    res.json(products[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});
  
// DELETE /api/products/:id - Delete a product

app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  products = products.filter(p => p.id !== productId);
  res.status(204).send(); // No content
});

// Example route implementation for GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// TODO: Implement custom middleware for:
// - Request logging
 app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

// - Authentication
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer my-secret-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});


// - Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 