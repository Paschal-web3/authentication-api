const { response } = require('express')
const Userschema = require('../Model/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    // Check if user already exists
    let { Fullname, Age, Address, Email, Password } = req.body

    if (!Fullname || !Age || !Address || !Email || !Password) {
        res.status(400).json({
            message: "Please provide all required fields"
        })
    }

    let hashpassword = bcrypt.hashSync(Password, 10)


    const verifyUser = await Userschema.findOne({Email})
    if (verifyUser) {
        res.status(400).json({
            message: "User already exists with this email"
        })
    }

   
    let newUser = new Userschema({
        Fullname,
        Age,
        Address,
        Email,
        Password: hashpassword
    })

   

    try {
        await newUser.save()
        // Generate JWT token
        const payload = {
            userId: newUser._id,
            Fullname: newUser.Fullname,
        }
        // Generate JWT token
        const accesToken = jwt.sign (payload, process.env.SECRET_KEY, {expiresIn: '1h'})

        // Send JWT token to the client
        res.status(200).json({
            message: "User Created Successfully",
            user: newUser,
            accesToken: accesToken
        })
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

exports.Login = async (req,res)=>{
    let {Email, Password} = req.body
    if (!Email || !Password) {
        res.status(400).json({
            message: "Please provide all required fields"
        })
    }
    const user = await Userschema.findOne({Email})
    if (!user) {
    res.status(400).json({
        message: "User not found"
    })
    }
    const deCrypt = bcrypt.compareSync(Password, user.Password)
    if (!deCrypt) {
        res.status(400).json({
            message: "Invalid Password"
        })
    }
    const payload = {
        userId: user._id,
        Fullname: user.Fullname,
    }
    const loginToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'})
    res.status(200).json({
        message: "Login Successful",
        user: user,
        loginToken: loginToken
    })
}


//Get User 

exports.getuser = async (req, res)=>{
    const user = await Userschema.find()
    res.status(200).json({ user: user })
}

exports.getUserbyId = async (req, res)=>{
    
    const user = await Userschema.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
        
    res.status(200).json(user)

}

exports.updateUser = async (req, res)=>{
    //update user
    const user = await Userschema.findByIdAndUpdate(req.params.id, req.body)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ message: 'User updated', response: user })
}

exports.deleteUser = async (req, res)=>{
    const user = await Userschema.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ message: 'User deleted', response: user})
    
}