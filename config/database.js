const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('🔄 Attempting to connect to MongoDB...');

        
        let mongoURI = process.env.MONGODB_URI || process.env.DATABASE_URL;

        // If no URI provided, use local MongoDB
        if (!mongoURI) {
            console.log('⚠️  No MONGODB_URI found in .env, using default: mongodb://localhost:27017/ecommerce');
            mongoURI = 'mongodb://localhost:27017/ecommerce';
        } else {
        
            const maskedURI = mongoURI.replace(/:([^:@]+)@/, ':*****@');
            console.log('📡 Connection string:', maskedURI);
        }

        const connectionOptions = {
            serverSelectionTimeoutMS: 10000, 
            socketTimeoutMS: 45000, 
        };

        console.log('⏳ Connecting... (this may take a few seconds)');

        await mongoose.connect(mongoURI, connectionOptions);

        console.log('✅ MongoDB connected successfully!');
        console.log('📍 Connected to:', mongoose.connection.host);
        console.log('📊 Database:', mongoose.connection.name);
    } catch (error) {
        console.error('\n❌ MongoDB connection error:', error.message);

        // Provide helpful error messages
        if (error.message.includes('authentication failed')) {
            console.error('   → Authentication failed. Check your username and password in MONGODB_URI');
            console.error('   → Make sure your password is URL-encoded if it has special characters');
        } else if (error.message.includes('ECONNREFUSED')) {
            console.error('   → Cannot connect to MongoDB. Make sure MongoDB is running.');
            console.error('   → For local MongoDB: Start MongoDB service');
            console.error('   → For Atlas: Check your connection string and network access');
        } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
            console.error('   → Cannot find MongoDB server. Check your connection string.');
            console.error('   → For Atlas: Make sure your IP is whitelisted in Network Access');
        } else if (error.message.includes('timeout') || error.message.includes('TIMEDOUT')) {
            console.error('   → Connection timeout. Server might be unreachable or IP not whitelisted.');
            console.error('   → For Atlas: Check Network Access settings and whitelist your IP (0.0.0.0/0 for all)');
        } else {
            console.error('   → Full error:', error);
        }

        console.error('\n💡 Tip: Check your .env file for MONGODB_URI\n');
        process.exit(1);
    }
};

module.exports = connectDB;