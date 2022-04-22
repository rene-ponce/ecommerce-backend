const { Router } = require('express');
const Cart = require('../api/cart.js');
const isAdmin = require('../middleware/isAdmin.js');

const api = new Cart('data/cart.json');
const router = Router();

router.post('/', isAdmin, async (req, res) => {
  try {
    const cart = await api.addCart(req.body);
    res.status(201).json(cart);
  } catch (error) {
    console.log(error);
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    api.deleteCartItem(id);
    return res.status(200).json({message: 'Carrito eliminado'});
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get('/:id/productos', async (req, res) => {
  try {
    const { id } = req.params;
    await api.getProductsByCartId(id).then(data => {
      return res.status(200).json(data);
    }).catch(error => {
      return res.status(500).json(error);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.post('/:id/productos', async (req, res) => {
  try {
    const { id } = req.params;
    api.addProductsToCartById(id, req.body);
    return res.status(201).json({message: 'Producto agregado'});
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.delete('/:id/productos/:id_prod', async (req, res) => {
  try {
    const { id, id_prod } = req.params;
    await api.deleteProductById(id, id_prod);
    return res.status(200).json({message: 'Producto eliminado correctamente'});
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;