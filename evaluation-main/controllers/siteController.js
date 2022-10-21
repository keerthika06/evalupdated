//const user = require('../models/user')
const {response} = require('express')
const Sites = require('../models/sites')
const Cryptr = require('cryptr');

//show the list of employees
const index = (req,res,next)=>{
    Sites.find()
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error=>{
       res.json({
        message: 'AN Error Occured'
       // res.status(500).send()
       }) 
    }
    )
}



//show single user to find 
const show = (req, res, next)=>{
    let SiteName = req.body.SiteName
    Sites.findOne({SiteName})
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
// updattttttttttttttttttttttteeeeeeeeeeee
const updateSiteById = async (req,res) =>{
    try {
        const response = await Sites.findByIdAndUpdate(req.params.id, req.body)
        res.send(response)
    }
    catch(error){
        console.log(error)
    }
}





//to add sites
const store = async (req, res, next)=>{

    const cryptr = new Cryptr(process.env.SECRET);
    const encryptedString = cryptr.encrypt(req.body.SitePassword);
    let site = new Sites({
        URL: req.body.URL,
        SiteName: req.body.SiteName,
        Sector: req.body.Sector,
        UserName : req.body.UserName,
        SitePassword: encryptedString,
        Notes : req.body.Notes
        
    })
    await site.save()
    .then(response =>{
        res.json({
            message : 'site added successfully'
        })
    })
    .catch(error=> {
        res.json({
            message: 'An error occured'
        })
    })
}


//************************************************** *

//************************************************ */
//update 
const update = (req,res,next) =>{
    let URL = req.body.URL
    let updatedData = ({
        URL : req.body.URL,
        SiteName : req.body.SiteName,
        Sector : req.body.Sector,
        UserName : req.body.UserName,
        SitePassword : req.body.SitePassword,
        Notes : req.body.Notes

    })
    Sites.findOneAndUpdate(URL, updatedData)
    .then(()=> {
        res.json({
            message : 'Site updated successfully'
        })
    })
    .catch(error=>{
        res.json({
            message: 'An error occured'
        })

    })
}
module.exports = {
    index,show,store,update,updateSiteById

}