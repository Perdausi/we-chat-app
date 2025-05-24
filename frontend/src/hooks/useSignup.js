import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} =  useAuthContext();

    const signup = async({fullname, username, password, ConfirmPassword, gender}) => {
        const success = handleInputErrors({fullname, username, password, ConfirmPassword, gender});
        if (!success) return;
    
        setLoading(true);
    
        try {
            const res = await fetch("/api/auth/signup",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fullname, username, password, ConfirmPassword, gender})
            });

            const data = await res.json();
            if(data.error){
                if(data.error.toLowerCase().includes("username")){
                    toast.error("Username Already Exist!");
                }else{
                    toast.error(data.error || "Signup failed.");
                }
                return;
            }

            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    };
    
    return {loading, signup};
    
    
};

export default useSignup

const handleInputErrors = ({fullname, username, password, ConfirmPassword, gender}) => {
    if (!fullname || !username || !password || !ConfirmPassword || !gender) {
        toast.error("Please fill in all fields 😢");
        return false;
    }

    if (password !== ConfirmPassword) {
        toast.error("Password do not match! 🙄")
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long 📏");
        return false;
    }

    return true;
}