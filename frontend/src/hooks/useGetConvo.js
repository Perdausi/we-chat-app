import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useGetConvo = () => {
    const [loading, setLoading] = useState();
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getCoversations = async () => {
        setLoading(true);
            try {
                const res = await fetch("/api/users");
                const data = await res.json();

                if(data.error){
                    throw new Error(data.error);
                }

                setConversations(data);
            } catch (error) {
                toast.error(error.message)
            }finally{
                setLoading(false)
            }
        }

        getCoversations();
    },[]);
    return {loading, conversations}
}

export default useGetConvo