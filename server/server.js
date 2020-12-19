import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRouter from './routes/product.routes.js';
import userRouter from './routes/user.routes.js';
import orderRouter from './routes/order.routes.js';
import uploadRouter from './routes/upload.routes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import path from 'path';
import morgan from 'morgan';
dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  // make client folder static to be accessible to express app
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => {
    res.send(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
