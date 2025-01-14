require('dotenv').config();
const express = require('express');
const mongoose = require('../config/db');
const cors = require('cors');
const morgan = require("morgan");

// Routes
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const companyRoutes = require('../routes/companyRoutes');
const personRoutes = require('../routes/personRoutes');
const productRoutes = require('../routes/productRoutes');
const invoiceRoutes = require('../routes/invoiceRoutes');

const itemRoutes = require('../routes/itemRoutes');
const houseRoutes = require('../routes/houseRoutes');
const tenantRoutes = require('../routes/tenantRoutes');

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
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/people', personRoutes)
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/invoices', invoiceRoutes);

app.use('/api/items', itemRoutes);
app.use('/api/houses', houseRoutes);
app.use('/api/tenants', tenantRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;