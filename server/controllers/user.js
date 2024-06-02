
const User = require("../models/user");
const {setUser} = require("../services/auth");


const handleUserSignup = async(req, res) => {
 
    const {name, email, password, password2} = req.body;
    
    if(password !== password2){
        return res.status(400).json({
            'error' : "password not matched!"
        })
    }
    try {
        await User.create({
            name,
            email,
            password,
        });
        return res.status(200).json({
            "message" : "Account created!"
        })
    } catch (error) {
        return res.status(400).json({
            'error' : "something went wrong! " +  error
        })
    }
    
}

const handleUserLogin = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });

        if (!user)
            return res.status(400).json({
            error: "Invalid Username or Password",
            });
        
        const token = setUser(user);
        return res.json({token});
    
    } catch (error) {
        return res.status(400).json({
            'error' : "something went wrong! " +  error
        })
    }
    
       
}


module.exports = {
    handleUserSignup,
    handleUserLogin,
}