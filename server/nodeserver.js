// // server-fixed.js
// // Import DNS fix FIRST before anything else
// import { setupDNSForMongoDB } from './text-direct.js';

// // Apply DNS fix immediately
// setupDNSForMongoDB();

// // Now import mongoose and other modules
// import mongoose from 'mongoose';
// import express from 'express';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());

// // MongoDB Connection with detailed logging
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://cluster0.5g3eozt.mongodb.net/resumebuilder';

// console.log('\n🚀 Starting MongoDB connection...');
// console.log('URI:', MONGODB_URI.replace(/:[^:@]+@/, ':****@'));

// mongoose.connection.on('connecting', () => {
//   console.log('📡 Connecting to MongoDB...');
// });

// mongoose.connection.on('connected', () => {
//   console.log('✅ MongoDB connected successfully!');
//   console.log('   Database:', mongoose.connection.db.databaseName);
//   console.log('   Host:', mongoose.connection.host);
// });

// mongoose.connection.on('error', (err) => {
//   console.error('❌ MongoDB connection error:', err.message);
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('📴 MongoDB disconnected');
// });

// // Connect to MongoDB
// async function connectDB() {
//   try {
//     await mongoose.connect(MONGODB_URI, {
//       serverSelectionTimeoutMS: 10000,
//       socketTimeoutMS: 45000,
//       family: 4, // Force IPv4
//     });
    
//     console.log('✅ Database connection established');
//   } catch (error) {
//     console.error('❌ Failed to connect to MongoDB:');
//     console.error('   Error:', error.message);
//     console.error('   Code:', error.code);
    
//     // Provide specific error guidance
//     if (error.message.includes('ECONNREFUSED')) {
//       console.error('\n💡 Solution: Your IP may not be whitelisted in MongoDB Atlas');
//       console.error('   1. Go to MongoDB Atlas → Network Access');
//       console.error('   2. Add your current IP or use 0.0.0.0/0 for testing');
//     } else if (error.message.includes('authentication failed')) {
//       console.error('\n💡 Solution: Check your username and password');
//     } else if (error.message.includes('querySrv')) {
//       console.error('\n💡 Solution: DNS issue persists');
//       console.error('   Try using standard connection string instead of SRV');
//     }
    
//     process.exit(1);
//   }
// }

// // Routes
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'Resume Builder API',
//     status: 'Server is running',
//     database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
//   });
// });

// app.get('/health', (req, res) => {
//   res.json({
//     server: 'OK',
//     database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
//     timestamp: new Date().toISOString()
//   });
// });

// // Start server
// async function startServer() {
//   await connectDB();
  
//   app.listen(PORT, () => {
//     console.log(`\n🌐 Server running on http://localhost:${PORT}`);    
//   });
// }

// startServer();