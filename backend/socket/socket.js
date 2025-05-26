import { Server } from "socket.io"; 
// import http from which is nodeJS built in module
import http from 'http'

// create express app here 
import express from 'express';

const app = express();

// create a socket server here 

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
    origin:["http://localhost:3000"],
    methods:["GET", "POST"],
}
});
// let's avoid CORS error

export const getReceiverID = (receiverID) =>{
    return userSocketMap[receiverID];
}

const userSocketMap = {};



// listen for connection 
io.on('connection',(socket)=> {
    console.log("a user is connected", socket.id)

    // this is the query to get all the users id that we need from our client
    const userID = socket.handshake.query.userID; 
    if (userID !== "undefined") userSocketMap[userID] = socket.id;
    console.log("userID", userID, "socketID", socket.id)


    // io.emit is use to send events to all connected client
    // when the user logs in whe can know who is online/offine using this "getOnlineUsers" event name
    io.emit("getOnlineUsers", Object.keys(userSocketMap));



    // socket.on() is used to listen to the events. can be use both in client and server side
    // update the server.js in the PORT or APP.listen
    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id)
        delete userSocketMap[userID];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})




// export the neccessary
export {app, io, server}