import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectDB from './db/connectDB.js';
import { app, server } from './socket/socket.js';

dotenv.config();
// const app = express(); transfer to the socket.js then import it here "import app from socket.js"
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// this line will convert the file into a static file
app.use(express.static(path.join(__dirname, "frontend/dist")));

// then this line will allow us to run our frontend in the server as well
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port,()=> {
    connectDB();
    console.log(`server running on port ${port}`)
});