const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = ( req,res,next) => {
    bcrypt.hash(req.body.MPin.toString(),10, function(err, hashedPass){
        if(err) {
            res.json({
                error : err
            })
        }
        
        let user = new User ({
            MobileNumber : req.body.MobileNumber,
            MPin : hashedPass
        })
        user.save()
        .then(docs =>{
            res.json({
                message: 'user added succesfully'
            })
        })
        .catch(error => {
            res.json({
                message : 'An error occured',error
            })
        })
    })

}
const login = (req,res,next)=>{
    var MobileNumber = req.body.MobileNumber
    var MPin = req.body.MPin
    User.findOne(
        //{$or : [
        {

            MobileNumber
        }
        //]}
        )
    .then(  (user) => {
        if(user)
        {
             bcrypt.compare(MPin.toString(),user.MPin, async (err, result)=>{
                if(err){
                    return res.json({
                       error:err
                    })
                }
                if(result){
                    
                    
                    let token =  jwt.sign({MobileNumber : user.MobileNumber}, 'secretValue',{expiresIn: '30h'})
                    let refreshtoken =  jwt.sign({MobileNumber : user.MobileNumber}, 'refreshtokensecret',{expiresIn: '48h'})
                    console.log(refreshtoken)
                   await User.findOneAndUpdate({MobileNumber},{RefreshToken:refreshtoken})
                    res.json({
                        message: 'Login Succesful!',
                        token,
                        refreshtoken
                    })

                }
                else {
                    res.json({
                        message: 'Password does not match'
                    })
                }
            })

        }else{
            res.json({
                message : 'NO user found'
            })
        }
    })
}

// const logout = (req,res,next)=>{
//     try {
//         req.session.destroy()
//         res.redirect('/register')

//     }
//     catch(error){
//         console.log(error.message)
//     }

// }


const refreshToken = (req,res,next)=> {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, 'refreshtokensecret', function(err,decode) {
        if(err){
            res.status(400).json({
                err
            })
        }
        else{
            let token = jwt.sign({name : decode.name}, 'thesecrettoken', {expiresIn : '30h'})
            let refreshToken = req.body.refreshToken
            res.status(200).json({
                message: "Token refreshed sucessfully ",
                token,
                refreshToken
            })
       
        }
    })
}

module.exports = {
    register, login , refreshToken
}