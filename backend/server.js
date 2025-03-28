import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectDB from './db/connectDB.js';


dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.listen(port,()=> {
    connectDB();
    console.log(`server running on port ${port}`)
});