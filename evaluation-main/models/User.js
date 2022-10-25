const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    MobileNumber: {
        type:Number,
        unique : true
    },
    MPin : {
        type: String
    }, 
    RefreshToken:{type:String}
},{timestamps: true}

)
const User = mongoose.model('User', userSchema)
module.exports = User