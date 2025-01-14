const Tenant = require("../models/Tenant");

const tenantMiddleware = async (req, res, next) => {
    const tenantDomain = req.headers["x-tenant-domain"]; // O extraído del subdominio
    if (!tenantDomain) {
        return res.status(400).json({ error: "Tenant domain is required" });
    }

    try {
        const tenant = await Tenant.findOne({ domain: tenantDomain });
        if (!tenant) {
            return res.status(404).json({ error: "Tenant not found" });
        }

        req.tenantId = tenant._id; // Añade el ID del tenant al request
        next();
    } catch (err) {
        console.error("Error fetching tenant:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    tenantMiddleware
};