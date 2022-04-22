const express = require('express');
const dotenv = require('dotenv');
const productsRoutes = require('./routes/products.js');
const cartRoutes = require('./routes/cart.js');

// Env file access
dotenv.config();

// Constants variables
const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/api/productos', productsRoutes);
app.use('/api/carrito', cartRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: -2,
    description: `ruta ${req.url} no implementada`
  });
});

const server = app.listen(port, () => console.log(`Server running on port ${port}`));
server.on('error', error => console.log(`Server error: ${error}`));