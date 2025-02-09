const User = require('../models/User');
const Tenant = require('../models/Tenant');
const Person = require('../models/Person');
const Company = require('../models/Company');
const Subscription = require('../models/Subscription');
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
      status: user.status,
      units: user.units,
      company: user.company,
      tenant: user.tenant,
      codeOTP: user.codeOTP,
      onboardingCompleted: user.onboardingCompleted,
    };

    res.json({ status: "ok", message: 'Login successful', data: { user: userData, token } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: `Error signin: ${err.message}`, data: null });
  }
};

const signup = async (req, res) => {
  try {
    const { name, surname, country, phone, email, password, companyName, taxId, address, plan } = req.body;

    // ✅ Validación de campos obligatorios
    const requiredFields = { name, email, password, companyName, taxId, address, plan };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({
          status: "error",
          message: `El campo ${key} es requerido.`,
          data: null,
        });
      }
    }

    // ✅ Validar plan de suscripción
    const validPlans = ["essential", "advanced", "enterprise"];
    if (!validPlans.includes(plan)) {
      return res.status(400).json({
        status: "error",
        message: "Plan de suscripción inválido.",
        data: null,
      });
    }

    // ✅ Validar formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "error",
        message: "Formato de correo electrónico inválido.",
        data: null,
      });
    }

    // // ✅ Validar formato del teléfono (opcional, pero recomendable)
    // const phoneRegex = /^\+\d{1,3}\d{7,14}$/;
    // if (phone && !phoneRegex.test(phone)) {
    //   return res.status(400).json({
    //     status: "error",
    //     message: "Formato de número de teléfono inválido (Ej: +593987654321).",
    //     data: null,
    //   });
    // }

    // ✅ Verificar si el usuario ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "La cuenta de correo ya está registrada.",
        data: null,
      });
    }

    const existCompany = await Company.findOne({ taxId });
    if (existCompany) {
      return res.status(400).json({
        status: "error",
        message: "La compañía ya está registrada.",
        data: null,
      });
    }

    const tenantName = companyName.trim().replace(/\s+/g, "-").toLowerCase();
    const existTenant = await Tenant.findOne({ name: tenantName });
    if (existTenant) {
      return res.status(400).json({
        status: "error",
        message: "La compañía ya está registrada.",
        data: null,
      });
    }

    // ✅ PASO 1: Crear Tenant
    const newTenant = await Tenant.create({ name: tenantName });

    // ✅ PASO 2: Crear la compañía asociada al administrador
    const newCompany = await Company.create({
      name: companyName,
      taxId,
      address,
      tenant: newTenant._id,
    });

    // ✅ PASO 3: Crear el usuario asociado al administrador
    const newUser = await User.create({
      name: `${name} ${surname}`,
      email,
      password,
      tenant: newTenant._id,
      company: newCompany._id,
      role: "admin",
      status: "active",
      profile: {
        name,
        surname,
        country,
        phone,
      }
    });

    // ✅ PASO 4: Crear la suscripción asociada al usuario
    let amount = 0;
    switch (plan) {
      case "essential":
        amount = 9.99;
        break;
      case "advanced":
        amount = 19.99;
        break;
      case "enterprise":
        amount = 29.99;
        break;
    }

    const newSubscription = await Subscription.create({
      user: newUser._id,
      plan,
      status: "active",
      amount,
      currency: "USD",
    });

    // ✅ PASO 5: Vincular la suscripción al usuario
    newUser.subscription = newSubscription._id;
    await newUser.save();

    // ✅ Respuesta exitosa
    res.status(201).json({
      status: "ok",
      message: "Cuenta registrada correctamente.",
      data: {
        user: {
          id: newUser._id,
          email: newUser.email,
          role: newUser.role,
        }
      },
    });
  } catch (err) {
    console.error("Error en signup:", err);
    res.status(500).json({
      status: "error",
      message: `Error durante el registro: ${err.message}`,
      data: null,
    });
  }
};

module.exports = { signin, signup };