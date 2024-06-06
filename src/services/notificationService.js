const { Notification } = require('../models');

const getNotifications = async (userId) => {
  const notifications = await Notification.findAll({ where: { userId } });
  return notifications;
};

const markNotificationsAsRead = async (userId) => {
  await Notification.update({ read: true }, { where: { userId } });
};

module.exports = {
  getNotifications,
  markNotificationsAsRead,
};
