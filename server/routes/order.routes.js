import express from 'express';
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getUserOrders
} from '../controllers/order.controller.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/userorders').get(protect, getUserOrders);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id').get(protect, getOrderById);

export default router;
