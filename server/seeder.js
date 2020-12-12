import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import products from './data/products.js';

import Product from './models/product.model.js';
import User from './models/user.model.js';
import Order from './models/order.model.js';

import connectDB from './config/db.js';

import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(p => ({ ...p, user: adminUser }));

    await Product.insertMany(sampleProducts);

    console.log('Data imported successfully'.green.inverse);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed successfully'.red.inverse);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

rl.question(
  'This will delete all data, Are you sure? (Yes/No)'.bold.white.inverse,
  async answer => {
    if (answer === 'yes' || answer === 'Yes') {
      dotenv.config();
      connectDB();
      if (process.argv[2] === '-D') {
        await destroyData();
        process.exit(0);
      } else {
        await importData();
        process.exit(0);
      }
    } else {
      console.log('Aborting...'.green);
    }
    rl.close();
  }
);
