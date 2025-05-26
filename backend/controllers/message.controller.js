import Conversation from '../models/conversation.model.js'
import Message from '../models/message,model.js'
import { getReceiverID, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => { // export to use in message route
    try {
        const {message} = req.body;
        const {id : receiverID} = req.params;
        const senderID = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all: [senderID, receiverID]},
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderID, receiverID],
            })
        }

        const newMessage = Message({
            senderID,
            receiverID,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        // await conversation.save();
        // await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]);
        
        // SOCKET IO FUNCTIONALITY GOES HERE!!
        const receiverSocketID = getReceiverID(receiverID);
        if (receiverSocketID) {
            io.to(receiverSocketID).emit("newMessage", newMessage);
        }


        res.status(201).json(newMessage);
    } catch (error) {
        console.error("error in message controller", error.message);
        res.status(500).json({error: "internal server error!"});
    }
}

export const getMessage = async (req, res) => { // export to use in message route
    try {
        const {id : userToChatId} = req.params;
        const senderID = req.user._id; 

        const conversation = await Conversation.findOne({
            participants:{$all: [senderID, userToChatId]},
        }).populate("messages"); // WE GET THE MESSAGES ITSELF IN THE CONVERSATION

        if (!conversation) return res.status(200).json([]); 
    
        const message = conversation.messages;
        
        res.status(200).json(message);

    } catch (error) {
        console.error("error in message controller (cannot get message)", error.message);
        res.status(500).json({error: "internal server error!"});
    }
}