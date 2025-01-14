const Tenant = require('../models/Tenant');
const User = require('../models/User');

exports.getTenant = async (req, res) => {
    try {
        const { _id } = req.params;

        const tenants = await Tenant.findOne({ _id });
        res.status(201).json({ status: "success", message: 'Tenant find successfully', data: tenants });
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message, data: null });
    }
};

exports.getTenantByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: "error", message: 'User not found', data: null });
        }

        const tenant = await Tenant.findOne({ _id: user.tenantId });
        res.status(201).json({ status: "success", message: 'Tenant find successfully', data: tenant });
    } catch (err) {
        res.status(400).json({ status: "error", message: `Error find user: ${err.message}`, data: null });
    }
};

exports.getTenantByDomain = async (req, res) => {
    try {
        const { domain } = req.params;

        const tenants = await Tenant.findOne({ domain });
        res.status(201).json({ status: "success", message: 'Tenant find successfully', data: tenants });
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message, data: null });
    }
};

exports.getTenants = async (req, res) => {
    try {
        const tenants = await Tenant.find();
        res.status(201).json({ status: "success", message: 'Tenant find successfully', data: tenants });
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message, data: null });
    }
};

exports.createTenant = async (req, res) => {
    try {
        const { name, domain, settings, isActive } = req.body;

        // create tenant
        const tenant = new Tenant({ name, domain, settings, isActive });

        await tenant.save();

        res.status(201).json({ status: "success", message: 'Tenant created successfully', data: tenant });
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message, data: null });
    }
}