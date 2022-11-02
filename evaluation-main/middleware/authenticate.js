const jwt = require('jsonwebtoken')

//function to authenticate the user.
const authenticate = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'secretValue',(err,user)=>{ 
            if (err) return res.status(401).send(err);
            req.user = user;
            console.log(user)
        }

        )


        
        next()
    }
    catch(error)
    {
        if(error.name == "TokenExpiredError"){
            res.status(401).json({
                message:"Token Expired"
            })
        }
        else{
        res.json({
            message: 'Authentication failed'
        })
    }
    }
} 

// const isLogout = async(req,res,next)=>{
//     try{
//         if(req.session.user_id){
//             res.redirect('/register')
//         }
//         next()
//     }
//     catch(error){
//         console.log(error.message)
//     }
// }

module.exports = authenticate 
//,isLogout



// const jwt = require("jsonwebtoken"); //to verify token

// //function to authenticate the user to give access to necessary operation
// function authenticate(req, res, next) {
//     const header = req.headers["authorization"];
//     const token = header && header.split(" ")[1];
//     if (token == null) return res.send("Authentication header not found");
//     jwt.verify(token,'secretValue', (err, user) => {
//         if (err) return res.status(401).send(err);
//         req.user = user;
//     });
//     console.log(req.user);
//     next();
// }

// module.exports = authenticate;