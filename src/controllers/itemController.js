const Item = require('../models/item');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.status(200).json({ items });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ item });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createItem = async (req, res) => {
    try {
        const { name, description, startingPrice, endTime } = req.body;
        const imageUrl = req.file ? req.file.path : null;
        const item = await Item.create({ name, description, startingPrice, endTime, imageUrl });
        res.status(201).json({ message: 'Item created successfully', item });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        const { name, description, startingPrice, endTime } = req.body;
        const imageUrl = req.file ? req.file.path : item.imageUrl;

        item.name = name || item.name;
        item.description = description || item.description;
        item.startingPrice = startingPrice || item.startingPrice;
        item.endTime = endTime || item.endTime;
        item.imageUrl = imageUrl;

        await item.save();
        res.status(200).json({ message: 'Item updated successfully', item });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        await item.destroy();
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
