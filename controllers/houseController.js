const House = require('../models/House');

exports.getHouse = async (req, res) => {
    try {
        const { _id } = req.params;

        const house = await House.findById({ _id });
        res.status(201).json({ message: 'House find successfully', house });
    } catch (err) {
        res.status(400).json({ message: 'Error find house', error: err.message });
    }
};

exports.getHouses = async (req, res) => {
    try {
        const houses = await House.find();
        res.status(201).json({ message: 'House find successfully', houses });
    } catch (err) {
        res.status(400).json({ message: 'Error find house', error: err.message });
    }
};

exports.createHouse = async (req, res) => {
    try {
        const { body } = req;

        // create house
        const house = new House(body);

        await house.save();

        res.status(201).json({ message: 'House created successfully', house });
    } catch (err) {
        res.status(400).json({ message: 'Error creating house', error: err.message });
    }
}