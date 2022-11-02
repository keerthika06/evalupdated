const mongoose = require('mongoose')
const Schema = mongoose.Schema


//forgot passwordddddddddddddddddddd
// const Joi = require('joi')

//User Schema
const userSchema = new Schema({
    MobileNumber:{
        type: Number,
        unique : true
    },
    MPin : {
        type: String
    },
    RefreshToken:{type:String}

},{timestamps : true})
const users = mongoose.model('user',userSchema)

// forgot passwordddddddddddd
// const validate = (users) => {
//     const schema = Joi.object({
//         MobileNumber : Joi.string().required(),
//         MPin : Joi.string().email().required()
//     })
//     return schema.validate(user)
// }


module.exports = users
