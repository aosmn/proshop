import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import colors from 'colors';

const protect = asyncHandler(async (req, res, next) => {
  const auth = req.headers.authorization;
  let token;
  if (auth && auth.startsWith('Bearer ')) {
    try {
      token = auth.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded._id).select('-password');
      next();
    } catch (error) {
      console.error(`${error}`.red);
      res.status(401);
      throw new Error('Not authorized, Invalid Token');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin!');
  }
};

export { protect, isAdmin };
