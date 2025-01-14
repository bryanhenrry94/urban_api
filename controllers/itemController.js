const Item = require('../models/Item');

exports.getItem = async (req, res) => {
    try {
        const { _id } = req.params;

        const user = await Item.findById({ _id });
        res.status(201).json({ message: 'Item find successfully', user });
    } catch (err) {
        res.status(400).json({ message: 'Error find item', error: err.message });
    }
};

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(201).json({ message: 'Item find successfully', items });
    } catch (err) {
        res.status(400).json({ message: 'Error find item', error: err.message });
    }
};

exports.createItem = async (req, res) => {
    try {
        const { body } = req;

        // create item
        const item = new Item(body);

        await item.save();

        res.status(201).json({ message: 'Item created successfully', item });
    } catch (err) {
        res.status(400).json({ message: 'Error creating item', error: err.message });
    }
}