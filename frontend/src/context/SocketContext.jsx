// first import the createContext from react
// export the SocketContext(this file) as a CONST VARIABLE into createContext so that we can consume the create context
// import { useAuthContext } from "./AuthContext" we will use the authUser for authenticated user 
// import the io socket.io-client

import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'




export const SocketContext = createContext();
export const useSocketContext = ()=>{
    return useContext(SocketContext);
}


// next is the provider 
export const SocketContextProvider = ({children}) =>{
    // lets create a socket connection with useState default null
    // the onlineUsers default []
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const {authUser} = useAuthContext();

    // use effect to create a socket connection 
    useEffect(()=>{
        if (authUser) {
            const socket = io("https://we-chat-app-prod.onrender.com",{
                query:{
                    userID: authUser._id,
                },
            });
    // comming from socket.js

            setSocket(socket);

            socket.on("getOnlineUsers", (users)=>{
                setOnlineUsers(users)
            })

            return ()=> socket.close();
        }else{
            if (socket) {
                socket.close();
                setSocket(null)
            }
        }
    },[authUser])
    // then return it like a component style <SocketProvider.Provider></>
    // then go to the main.jsx file and wrap the application(app.jsx) with this SocketContextProvider 
    return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
}



// NOTE : install this package socket.io-client this will be our socket.io communication in frontend 









