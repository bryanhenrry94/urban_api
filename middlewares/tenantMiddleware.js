const Tenant = require("../models/Tenant");

const tenantMiddleware = async (req, res, next) => {
    const tenant = req.headers["x-tenant-id"]; // O extraído del subdominio

    if (!tenant) {
        return res.status(400).json({ error: "Tenant domain is required" });
    }

    try {
        const _tenant = await Tenant.findById(tenant);
        if (!_tenant) {
            return res.status(404).json({ error: "Tenant not found" });
        }

        req.tenant = _tenant._id; // Añade el ID del tenant al request
        next();
    } catch (err) {
        console.error("Error fetching tenant:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    tenantMiddleware
};