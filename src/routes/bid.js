const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/items/:itemId/bids', bidController.getAllBids);
router.post('/items/:itemId/bids', authMiddleware, bidController.createBid);

module.exports = router;
