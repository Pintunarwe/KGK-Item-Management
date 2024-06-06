const Bid = require('../models/bid');
const Item = require('../models/item');

exports.getAllBids = async (req, res) => {
    try {
        const bids = await Bid.findAll({ where: { itemId: req.params.itemId } });
        res.status(200).json({ bids });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createBid = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { bidAmount } = req.body;
        const userId = req.user.id;

        const item = await Item.findByPk(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (bidAmount <= item.currentPrice) return res.status(400).json({ message: 'Bid amount must be higher than the current price' });

        const bid = await Bid.create({ itemId, userId, bidAmount });
        item.currentPrice = bidAmount;
        await item.save();

        res.status(201).json({ message: 'Bid placed successfully', bid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
