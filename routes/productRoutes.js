const express = require('express');
const router = express.Router();
const {
  createProduct,
  updateProduct,
  getProducts,
  getProductById,
  deleteProduct,
} = require('../controllers/productController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const { validateProduct, validateProductCreate } = require('../utils/validation');


router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', authenticate, authorizeAdmin, validateProductCreate, createProduct);
router.put('/:id', authenticate, authorizeAdmin, validateProduct, updateProduct);
router.delete('/:id', authenticate, authorizeAdmin, deleteProduct);

module.exports = router;





