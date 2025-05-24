import User from '../models/user.model.js'; // Import the User model from the models directory
import bcrypt from 'bcryptjs'; // Import the bcrypt library for password hashing
import generateTokenAndSetCookie from '../utils/generateToken.js'; // Import the function to generate a token and set a cookie from the utils directory

export const signup = async (req, res) => {
   try {
    const {
        fullname, 
        username, 
        password, 
        ConfirmPassword, 
        gender,
        } = req.body;

        // SEND INPUT/DATA TO THE BODY

    if (password !== ConfirmPassword) {
        return res.status(400).json({error:"password and confirm password do not match!"});
    }
    // CHECK PASSWORD IF THE SAME AS THE CONFIRM PASSWORD

    const user = await User.findOne({username});
    if(user){
        return res.status(400).json({error:"username already exist!"});
    }
    // CHECK IF THE USERNAME ALREADY EXIST!
    

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // HASH THE PASSWORD WITH SALT

    const boyProfile = `https://api.dicebear.com/6.x/adventurer/svg?seed=Easton`;
    const girlProfile = `https://api.dicebear.com/9.x/adventurer/svg?seed=Vivian`;

    // SET DEFAULT PROFILE PIC FOR THE USER - DETERMINE THE GENDER OF THE USER

    const newUser = new User({
        fullname,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfile : girlProfile
    });
    // CREATE A NEW USER WITH THE HASHED PASSWORD AND DEFAULT PROFILE PIC

    if(newUser){
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        // IF THE NEW USER IS CREATED, GENERATE A TOKEN AND SET COOKIE FOR THE USER
    res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic
    })
    // RETURN WITH THE RESPONSE WITH THE USERS DATA
    }else{
        res.status(400).json({error: "invalid user data!"});
    }
   } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
   }
    

};

export const login = async (req, res) => {
    try {
        const {username, password} = req.body; // GET THE USERNAME AND PASSWORD FROM THE REQUEST BODY
        const user = await User.findOne({ username }); // FIND THE USER WITH THE USERNAME
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        } // Check if user exists before comparing passwords
        const isValidPassword = await bcrypt.compare(password, user.password || ""); // COMPARE THE PASSWORD WITH THE HASHED PASSWORD
        

        if(!user || !isValidPassword){ // IF THE USER DOES NOT EXIST OR THE PASSWORD IS INCORRECT
           return res.status(400).json({error:"Invalid username or password"});
        }
        generateTokenAndSetCookie(user._id, res); // IF THE USER EXISTS AND THE PASSWORD IS CORRECT, GENERATE A TOKEN AND SET COOKIE FOR THE USER

        res.status(200).json({ // RETURN WITH THE RESPONSE WITH THE USERS DATA
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logout Successfully!"});
    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};