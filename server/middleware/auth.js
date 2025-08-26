const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    console.log('No token provided. Header:', header);
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = header.split(' ')[1];
  console.log('Received JWT token:', token);
  console.log('JWT_SECRET from env:', process.env.JWT_SECRET);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log('JWT payload:', payload);
    const user = await User.findById(payload.id).select('-password');
    if (!user) {
      console.log('User not found for payload id:', payload.id);
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log('JWT verification error:', err);
    return res.status(401).json({ message: 'Token error' });
  }
};

module.exports = auth;
