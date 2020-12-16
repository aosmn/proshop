import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRouter from './routes/product.routes.js';
import userRouter from './routes/user.routes.js';
import orderRouter from './routes/order.routes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
