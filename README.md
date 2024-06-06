# Bidding Platform

## Overview
A comprehensive RESTful API for a real-time bidding platform using Node.js, Express, Socket.io, and MySQL. 

## Features
- User Registration and Authentication
- Role-based Access Control
- CRUD operations for Auction Items
- Real-time Bidding with Socket.io
- Notifications System
- Image Upload for Auction Items

## Setup Instructions

### Prerequisites
- Node.js and npm
- MySQL

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/your-repository-name.git
    cd your-repository-name
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your configuration settings:
    ```env
 
    ```

4. Create the database and tables using Sequelize migrations:
    ```bash
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    ```

### Running the Application

Start the application:
```bash
npm start
