import mongoose from "mongoose";
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connecting to database successfully");
    } catch (error) {
        console.log("Database connection error:",error);
    }
}

export default connectDB;