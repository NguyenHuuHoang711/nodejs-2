
require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const logger = require('./utils/logger');
const errorHandler = require('./middlewares/errorHandler');
const dashboardRoutes = require('./routes/dashboardRoutes');
const folderRoutes = require('./routes/folderRoutes');
const fileRoutes = require('./routes/fileRoutes');
const recentlyOpenedRoutes = require('./routes/RecentlyOpened');

const app = express();

app.set('trust proxy', 1);

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1';

// CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
    'https://amay.asao.vn',
    'http://amay.asao.vn'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With'
  ],
  exposedHeaders: ['Content-Disposition']
}));

app.use(express.json({ limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(
  `/api/${API_VERSION}/uploads`,
  express.static(path.join(__dirname, 'uploads'))
);

// Database
const db = require('./config/db');
db.connect();

// API routes
app.use(`/api/${API_VERSION}/users`, require('./routes/userRoutes'));
app.use(`/api/${API_VERSION}/auth`, require('./routes/authRoutes'));
app.use(`/api/${API_VERSION}/admin`, require('./routes/adminRoutes'));
app.use(`/api/${API_VERSION}/folders`, folderRoutes);
app.use(`/api/${API_VERSION}/files`, fileRoutes);
app.use(
  `/api/${API_VERSION}/workspaces`,
  require('./routes/workspaceRoutes')
);
app.use(
  `/api/${API_VERSION}/recently-opened`,
  recentlyOpenedRoutes
);
app.use(`/api/${API_VERSION}/share`, fileRoutes);

// Dashboard
app.use(`/api/${API_VERSION}/dashboard`, dashboardRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Backend is running'
  });
});

// Error handling middleware - đặt sau các routes
app.use(errorHandler);

// Start server
app.listen(port, host, () => {
  logger.info(`Server listening on http://${host}:${port}`);
});

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception thrown:', err);
  process.exit(1);
});