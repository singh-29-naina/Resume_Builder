import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Force IPv4 and add better timeout 
        
        const connect = await mongoose.connect(process.env.MONGODB_URI, {
            family: 4, // Force IPv4 (this often fixes ECONNREFUSED)
            serverSelectionTimeoutMS: 10000, // Timeout after 10s
            socketTimeoutMS: 45000,
        });
        
        console.log(`✅ MongoDB Connected: ${connect.connection.host}`);
        console.log(`📁 Database: ${connect.connection.name}`);
    } catch (error) {
        console.error("❌ MongoDB connection error:");
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        
        // More specific error messages
        if (error.code === 'ECONNREFUSED') {
            console.error("\n🔍 Possible causes:");
            console.error("1. Check if your IP is whitelisted in MongoDB Atlas");
            console.error("2. Verify your connection string in .env");
            console.error("3. Check if cluster is paused in MongoDB Atlas");
            console.error("4. Try using mobile hotspot to test if ISP is blocking");
        }
        
        throw error;
    }
};

export default connectDB;