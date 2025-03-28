import User from "../models/user.model.js";

export const getUsersForSideBar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id; 

        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password"); // exclude the logged in user from the list of users in the sidebar {_id: {$ne: loggedInUserId}}
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("error in getUsersForSideBar funtion", error.message);
        res.status(500).json({ message: "Internal Server Error" }); 
    }
}


