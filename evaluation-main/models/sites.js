const mongoose = require('mongoose')
const Schema = mongoose.Schema


const siteSchema = new Schema({
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

const sites = mongoose.model('site',siteSchema)
module.exports = sites

//done
