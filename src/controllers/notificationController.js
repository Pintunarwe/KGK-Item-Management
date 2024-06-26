const Notification = require('../models/notification');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({ where: { userId: req.user.id } });
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        await Notification.update({ isRead: true }, { where: { userId: req.user.id } });
        res.status(200).json({ message: 'Notifications marked as read' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
