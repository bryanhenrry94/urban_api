const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    };

    res.json({ status: "ok", message: 'Login successful', data: { user: userData, token } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error signin: ${err.message}`, data: null });
  }
};

const signup = async (req, res) => {
  try {
    const { body } = req;

    const user = await User.create(body);
    res.status(201).json({ status: 'ok', message: 'User registered successfully', data: user });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error signup: ${err.message}`, data: null });
  }
};

module.exports = { signin, signup };