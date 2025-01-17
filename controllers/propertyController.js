const Property = require('../models/Property');

exports.getProperty = async (req, res) => {
    try {
        const { _id } = req.params;

        const property = await Property.findById({ _id });
        res.status(201).json({ status: 'ok', message: 'Property find successfully', data: property });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding perperties: ${err.message}`, data: null });
    }
};

exports.getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(201).json({ status: 'ok', message: 'Properties find successfully', data: property });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding perperties: ${err.message}`, data: null });
    }
};

exports.createProperty = async (req, res) => {
    try {
        const { body } = req;

        // create Property
        const property = new Property(body);
        await property.save();

        res.status(201).json({ status: 'ok', message: 'Propertiy created successfully', data: property });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error creatind perperty: ${err.message}`, data: null });
    }
}