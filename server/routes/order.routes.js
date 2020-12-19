import express from 'express';
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUserOrders,
  getOrders
} from '../controllers/order.controller.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, isAdmin, getOrders).post(protect, createOrder);
router.route('/userorders').get(protect, getUserOrders);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);
router.route('/:id').get(protect, getOrderById);

export default router;
