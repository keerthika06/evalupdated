//const user = require('../models/user')
const {response} = require('express')
const User = require('../models/users')

//show the list of employees
const index = (req,res,next)=>{
    User.find()
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error=>{
       res.json({
        message: 'AN Error Occured'
       }) 
    })
}
//show single user
const show = (req, res, next)=>{
    let MobileNumber = req.body.MobileNumber
    User.findOne({MobileNumber})
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error=> {
        res.json({
        message: 'AN error occured'

})
}) 
}
const store = async (req, res, next)=>{
    let user = new User({
        MobileNumber: req.body.MobileNumber,
        MPin: req.body.MPin
        
    })
    await user.save()
    .then(response =>{
        res.json({
            message : 'user added successfully'
        })
    })
    .catch(error=>{
        res.json({
            message: 'An error occured'
        })
    })
}

//update 
const update = (req,res,next) =>{
    let MobileNumber = req.body.MobileNumber
    let updatedData = ({
        MobileNumber : req.body.MobileNumber,
        MPin : req.body.MPin
    })
    User.findOneAndUpdate(MobileNumber,  updatedData)
    .then(()=> {
        res.json({
            message : 'user updated successfully'
        })
    })
    .catch(error=>{
        res.json({
            message: 'An error occured'
        })

    })
}

//logout
// const logout = (req,res) =>{
//     if(req.headers && req.headers.authorization){
//         console.log(req.headers.authorization)
//         res.send('ok')
//     }
// }

// const logout = async (req,res)=> {
//     if(req.headers && req.headers.authorization) {
//         const token = req.headers.authorization.split(' ')[1]
//         if(!token){
//             return res.status(401).json({sucess:false, message: 'Authorization fail'})
//         }
//         const result = await User.findOneAndUpdate({RefreshToken:token},{RefreshToken:""})
//         if(result) return res.send("logged out")
//         // const tokens = req.user.tokens
//        // const newTokens = tokens(t => t !== token)
//        console.log(result)

//        // await User.findByIdAndUpdate(req.user._id, {tokens : newTokens})
//         res.json({sucess: true ,message : 'sign out sucessfully'})
//     }
// }






module.exports = {
    index,show,store,update

}
