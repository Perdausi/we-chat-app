import { useState } from 'react';
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();
    // create a function to send message 
    const sendMessage = async (message) =>{

        setLoading(true);

        try {
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({message})
            }); 
            const data = await res.json(); 
            // then add a error security

            if(data.error) throw new Error(data.error);
            // this error will be catch in the catch block
            // setMessages
            setMessages([...messages, data]);

        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }

    return {sendMessage, loading};
}

export default useSendMessage