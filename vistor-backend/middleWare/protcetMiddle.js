const asyncHnadler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../moduls/users/userModul');

const protact = asyncHnadler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.decode(token, process.env.TOKEN_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      throw new Error('token not correct');
    }
  }
  if (!token) {
    res.status(400);
    throw new Error('No token no authorized');
  }
});

module.exports = protact;
