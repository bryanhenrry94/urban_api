const dotenv = require('dotenv');
// Cargar el archivo .env según el entorno
const ENV = process.env.ENV || 'development';
dotenv.config({ path: `.env.${ENV}` });

if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI no está definido en las variables de entorno');
    process.exit(1);
}

const express = require('express');
const mongoose = require('../config/db');
const cors = require('cors');
const morgan = require("morgan");

// Routes
const authRoutes = require('../routes/authRoutes');
const companyRoutes = require('../routes/companyRoutes');
const invoiceRoutes = require('../routes/invoiceRoutes');
const notificationRoutes = require('../routes/notificationRoutes');
const paymentRoutes = require('../routes/paymentRoutes');
const personRoutes = require('../routes/personRoutes');
const productRoutes = require('../routes/productRoutes');
const propertyRoutes = require('../routes/propertyRoutes');
const userRoutes = require('../routes/userRoutes');
const urbanizationRoutes = require('../routes/urbanizationRoutes');
const residentRoutes = require('../routes/residentRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

// Routes v1
app.get('/', function (req, res) {
    res.send({ message: 'Welcome to Urban API' });
})
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/invoices', invoiceRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/persons', personRoutes)
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/properties', propertyRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/urbanizations', urbanizationRoutes);
app.use('/api/v1/residents', residentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;