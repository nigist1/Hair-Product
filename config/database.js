
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 Connecting...');
    await mongoose.connect(process.env.MONGODB_URI, { family: 4 });

    console.log('✅ Connected to MongoDB!');

    
    const Test = mongoose.model('Test', new mongoose.Schema({ name: String }));
    const doc = await Test.create({ name: 'initial test' });

    console.log('📊 Database name now:', mongoose.connection.db.databaseName);
    console.log('Collections:', await mongoose.connection.db.listCollections().toArray());

  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
};

module.exports = connectDB;
