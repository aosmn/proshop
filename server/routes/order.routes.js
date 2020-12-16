import express from 'express';
import {
  createOrder,
  getOrderById,
  updateOrderToPaid
} from '../controllers/order.controller.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id').get(protect, getOrderById);

export default router;
