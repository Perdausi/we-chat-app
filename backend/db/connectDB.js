import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI,);
        console.log("DB CONNECTED!")
    } catch (error) {
        console.log("CONNECTING TO DB FAILED", error.message)
    }
};

export default connectDB;