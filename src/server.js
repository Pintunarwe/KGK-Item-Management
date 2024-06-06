// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const sequelize = require('./config/database');
// const userRoutes = require('./routes/user');
// const itemRoutes = require('./routes/item');
// const bidRoutes = require('./routes/bid');
// const notificationRoutes = require('./routes/notification');
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(express.json());

// app.use('/users', userRoutes);
// app.use('/items', itemRoutes);
// app.use('/bids', bidRoutes);
// app.use('/notifications', notificationRoutes);

// io.on('connection', (socket) => {
//     console.log('New client connected');

//     socket.on('bid', (data) => {
//         io.emit('update', data);
//     });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

// const PORT = process.env.PORT || 3000;

// sequelize.sync()
//     .then(() => {
//         server.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//         });
//     })
//     .catch((err) => console.error('Unable to connect to the database:', err));


// src/server.js
const http = require('http');
const app = require('./app');
const socketIo = require('socket.io');
const sequelize = require('./config/database');
require('dotenv').config();

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('bid', (data) => {
        io.emit('update', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;

sequelize.sync()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.error('Unable to connect to the database:', err));
