const User = require('../models/User');
const Tenant = require('../models/Tenant');
const Person = require('../models/Person');
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
      tenantId: user.tenantId,
      companies: user.companies,
      companySelected: user.companySelected,
    };

    res.json({ status: "ok", message: 'Login successful', data: { user: userData, token } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error signin: ${err.message}`, data: null });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!name) {
      return res.status(400).json({ status: 'error', message: 'Campos name es requerido', data: null });
    }
    if (!email) {
      return res.status(400).json({ status: 'error', message: 'Campos email es requerido', data: null });
    }
    if (!password) {
      return res.status(400).json({ status: 'error', message: 'Campos password es requerido', data: null });
    }

    // Validar si el correo del administrador ya existe
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'Correo electronico ya esta registrado', data: null });
    }

    // Crear Tenant
    const newTenant = await Tenant.create({ name: name });

    // Crear el usuario asociado al administrador
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
      tenantId: newTenant._id,
    });

    // Respuesta exitosa
    res.status(201).json({
      status: 'ok',
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser._id,
          email: newUser.email,
          role: newUser.role,
        },
        company: [],
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error during signup: ${err.message}`, data: null });
  }
};

module.exports = { signin, signup };