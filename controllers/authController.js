const User = require('../models/User');
const Company = require('../models/Company');
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
      companyId: user.companyId,
    };

    res.json({ status: "ok", message: 'Login successful', data: { user: userData, token } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error signin: ${err.message}`, data: null });
  }
};

const signup = async (req, res) => {
  try {
    const { company, admin } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!company || !admin) {
      return res.status(400).json({ status: 'error', message: 'Company and admin data are required', data: null });
    }

    // Validar si el RUC ya existe
    const existingCompany = await Company.findOne({ ruc: company.ruc });
    if (existingCompany) {
      return res.status(400).json({ status: 'error', message: 'Company RUC already exists', data: null });
    }

    // Validar si el correo del administrador ya existe
    const existingUser = await User.findOne({ email: admin.email });
    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'Admin email already exists', data: null });
    }

    // Crear la empresa
    const newCompany = await Company.create({
      name: company.name,
      ruc: company.ruc,
      address: company.address,
      phone: company.phone,
    });

    // Crear la persona asociada al administrador
    const newPerson = await Person.create({
      companyId: newCompany._id,
      name: admin.name,
      email: admin.email,
      idType: admin.idType,
      idNumber: admin.idNumber,
      phone: admin.phone,
      roles: admin.roles,
    });

    // Crear el usuario asociado al administrador
    const newUser = await User.create({
      personId: newPerson._id,
      companyId: newCompany._id,
      email: admin.password,
      password: hashedPassword,
    });

    // Respuesta exitosa
    res.status(201).json({
      status: 'ok',
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser._id,
          email: newUser.email,
          roles: admin.roles,
        },
        company: {
          id: newCompany._id,
          name: newCompany.name,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error during signup: ${err.message}`, data: null });
  }
};

module.exports = { signin, signup };