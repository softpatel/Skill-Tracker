require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const skillRoutes = require('./routes/skills');

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads', 'profile-images');
fs.mkdirSync(uploadsDir, { recursive: true });

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);

const PORT = process.env.PORT || 5005;

// Start server and connect to database
const startServer = async () => {
  try {
    // First try to connect to database
    console.log('Starting server...');
    await connectDB();
    
    // Only start server if database connection is successful
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();