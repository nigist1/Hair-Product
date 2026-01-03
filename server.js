const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
  });
});


const frontendBuildPath = path.join(__dirname, 'frontend', 'dist');

if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));

  
  app.get(/^(?!\/(auth|products|orders|health)).*$/, (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });

} else {
  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Backend is running. Frontend build not found.',
    });
  });
}


app.use(errorHandler);


const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};


if (process.env.NODE_ENV !== 'test' && require.main === module) {
  startServer();
}

module.exports = app;
