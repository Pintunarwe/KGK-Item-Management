// src/app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import routes
const userRoutes = require('./routes/user');
const itemRoutes = require('./routes/item');
const bidRoutes = require('./routes/bid');
const notificationRoutes = require('./routes/notification');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Routes
app.use('/users', userRoutes);
app.use('/items', upload.single('image'), itemRoutes);
app.use('/bids', bidRoutes);
app.use('/notifications', notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Export app for server.js
module.exports = app;
