const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const sign = (u) => jwt.sign({ role: u.role, email: u.email, name: u.name }, env.jwtSecret,
  { subject: String(u.id), expiresIn: env.jwtExpiresIn });

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findByEmail(email)) throw new ApiError(409, 'Email is already registered.');
  const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 10) });
  res.status(201).json({ success: true, user });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  // Same message for unknown email / wrong password to avoid account enumeration
  if (!user || !(await bcrypt.compare(password, user.password_hash))) throw new ApiError(401, 'Invalid email or password.');
  const { password_hash, ...safe } = user;
  res.json({ success: true, token: sign(safe), user: safe });
});

exports.me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(401, 'User no longer exists.');
  res.json({ user });
});
