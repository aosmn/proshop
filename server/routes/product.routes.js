import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
} from '../controllers/product.controller.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router.get('/top', getTopProducts);
router.route('/:id/reviews').post(protect, createProductReview);
router
  .route('/:id')
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProduct);

export default router;
