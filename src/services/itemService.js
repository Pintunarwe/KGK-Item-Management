const { Item } = require('../models');

const createItem = async (data) => {
  const item = await Item.create(data);
  return item;
};

const getAllItems = async () => {
  const items = await Item.findAll();
  return items;
};

const getItemById = async (id) => {
  const item = await Item.findByPk(id);
  if (!item) {
    throw new Error('Item not found');
  }
  return item;
};

const updateItem = async (id, data) => {
  const item = await getItemById(id);
  await item.update(data);
  return item;
};

const deleteItem = async (id) => {
  const item = await getItemById(id);
  await item.destroy();
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};
