const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Site schema
const siteSchema = new Schema({
    MobileNumber: {
        type: Number
    },
    URL:{
        type: String
    },
    SiteName : {
        type: String
    },
    Sector : {
        type: String
    },
    UserName : {
        type: String
    },
    SitePassword : {
        type: String
    },
    Notes : {
        type: String
    }
},{timestamps : true})
siteSchema.index({ "$**": "text" });
// siteSchema.index({ MobileNumber:1 }, { unique: true });

const sites = mongoose.model('site',siteSchema)
module.exports = sites

//done
