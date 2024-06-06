const { Bid, Item } = require('../models');

const placeBid = async (itemId, userId, amount) => {
  const item = await Item.findByPk(itemId);
  if (!item) {
    throw new Error('Item not found');
  }
  const bid = await Bid.create({ itemId, userId, amount });
  return bid;
};

const getBidsByItemId = async (itemId) => {
  const bids = await Bid.findAll({ where: { itemId } });
  return bids;
};

module.exports = {
  placeBid,
  getBidsByItemId,
};
