const Property = require('../models/Property');

exports.getProperty = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;

        const property = await Property.findById({ _id, tenant });
        res.status(201).json({ status: 'ok', message: 'Property find successfully', data: property });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding perperties: ${err.message}`, data: null });
    }
};

exports.getProperties = async (req, res) => {
    try {
        const { tenant } = req;

        const properties = await Property.find({ tenant }).populate({ path: 'urbanizationId', as: 'Urbanization' }).populate({ path: 'residents', model: 'User' });
        res.status(201).json({ status: 'ok', message: 'Properties find successfully', data: properties });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding perperties: ${err.message}`, data: null });
    }
};

exports.createProperty = async (req, res) => {
    try {
        const { body, tenant } = req;

        // create Property
        body.tenant = tenant;

        const property = new Property(body);
        await property.save();

        res.status(201).json({ status: 'ok', message: 'Propertiy created successfully', data: property });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error creatind perperty: ${err.message}`, data: null });
    }
}

exports.updateProperty = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body, tenant } = req;

        const property = await Property.findByIdAndUpdate({ _id, tenant }, body, { new: true });

        res.status(200).json({ status: 'ok', message: 'Property updated successfully', data: property });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating property: ${err.message}`, data: null });
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tenant } = req;

        await Property.findByIdAndDelete({ _id, tenant });

        res.status(200).json({ status: 'ok', message: 'Property deleted successfully', data: null });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error deleting property: ${err.message}`, data: null });
    }
};