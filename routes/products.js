const { Router } = require('express');
const Product = require('../api/product.js');
const isAdmin = require('../middleware/isAdmin.js');

const api = new Product('data/products.json');
const router = Router();

// Get all products or specific product
router.get('/:id?', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const products = await api.getAllProducts(id);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send(error);
  }
});
// Add product
router.post('/', (req, res) => {
  try {
    api.addProduct(req.body);
    return res.status(201).json({message: 'Producto agregado'}); 
  } catch (error) {
    return res.status(500).json(error);
  }
});
// Update product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  api.updateProduct(id, req.body);
  return res.status(203).json({message: 'Producto actualizado'});
});
// Delete product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  api.deleteProduct(id);
  return res.status(200).json({message: 'Producto eliminado'});
});

module.exports = router;