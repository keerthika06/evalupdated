const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//const otpGenerator = require('otp-generator')
const speakeasy=require("speakeasy")

//function to register a user.
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


//function to login an user.
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

//function to generate a refreh token
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
// const generateotp = (req,res,next) => {
//     const 
// }


//function to logout an user.
let logout = async (req, res) => {
    try {
        
        const userToken = await User.findOne({
            RefreshToken: req.body.refreshToken,
        }); // finding document with the matched refresh token
        if (!userToken) {
            return res.status(200).json({
                error: false,
                message: "You have logged out already!",
            }); // if no user exists, by default return logged out
        } else {
            await User.findOneAndUpdate(
                { RefreshToken: req.body.refreshToken },
                { RefreshToken: "" }
            );
            res.json({ error: false, message: "Logged out successfully" });
        }
    } catch (err) {
        res.json({ error: true, message: err.message });
    }
};


//function to generate OTP.
const sendOTP = async (req, res) => {
    try {
        const secret = speakeasy.generateSecret({ length: 10 });
        res.send({
            OTP: speakeasy.totp({
                secret: secret.base32,
                encoding: "base32",
                step: 60,
            }),
            secret: secret.base32,
        });
    } catch (err) {
        res.json({ message: err.message });
    }
};

//verification of number using speakeasy
let verifyNum = async (req, res, next) => {
    try {
        const result = speakeasy.totp.verify({
            secret: req.body.secret,
            encoding: "base32",
            token: req.body.OTP,
            window: 0,
            step: 60,
        });
        if (result) {
            // res.send({
            //     message: "Verified",
            // });
            next();
        } else {
            res.json({ message: "Verification unsuccessful" });
        }
    } catch (err) {
        res.json({ message: err.message });
    }
};
//function to forgot password
let forgotPass = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const newmPin = await bcrypt.hash(req.body.MPin, 10);
        await User.findOneAndUpdate(
            { MobileNumber: req.body.MobileNumber },
            { MPin: newmPin }
        );
        res.json({ message: "MPin changed successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
};


//function to reset the password
let resetPassword = async(req,res)=>{
    try {
                hashedPass = await bcrypt.hash(req.body.MPin,10)
            await User.findOneAndUpdate({
                MobileNumber: req.body.MobileNumber
            },{
                MPin: hashedPass
            })
            res.send("PASSWORD SUCESSFULLY RESET")
    } catch (error) {
        res.send(error.message)
    }
}



// const l = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
// console.log(l)






//export all the functions

module.exports = {
    register, login , refreshToken , logout , resetPassword , sendOTP ,verifyNum, forgotPass
}