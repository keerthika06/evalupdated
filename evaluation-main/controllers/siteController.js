//const user = require('../models/user')
const {response} = require('express')
const Sites = require('../models/sites')
const Cryptr = require('cryptr');
const cryptr = new Cryptr("myTotallySecretKey");
//show the list of sites
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

//search function

const search = async (req, res) => {

    try {

        let search = req.query.search ;

        var regex = new RegExp(search, "i"); //case insensitive
        await Sites.find(

            { MobileNumber: req.user.MobileNumber, $text: { $search: regex } },

            (err, docs) => {

                if (docs) {
                    return res.status(200).send({docs });

                } else
                return  res.send(err);

            }

        ).clone();

    } catch (err) {

        return res.json({ message: err.message });

    }

};
//search sector
const searchSector = async (req, res) => {
    try {
        let sector = req.body.sector;
        await Sites.find(
            {
                $and: [{ sector: sector }, { MobileNumber: req.user.MobileNumber }],
            },
            { __v: 0 },
            function (err, documents) /*callback*/ {
                if (err) return res.sendStatus(401).send(err);
                else {
                    if (documents.length == 0) {
                        return res.send(`No sites in ${sector} category!`);
                    }
                    return res.send(documents);
                }
            }
        ).clone();
    } catch (err) {
        return res.json({ message: err.message });
    }
};








//updateSiteBYid
// const updateSiteById = async (req,res) =>{
//     try {
//         const response = await Sites.findByIdAndUpdate(req.params.id, req.body)
//         res.send(response)
//     }
//     catch(error){
//         console.log(error)
//     }
// }





//to add sites
const store = async (req, res, next)=>{

    const cryptr = new Cryptr(process.env.SECRET);
    const encryptedString = cryptr.encrypt(req.body.SitePassword);
    let site = new Sites({
        MobileNumber: req.user.MobileNumber,
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
const editSite = async (req, res) => {
    try {
        const result = await Sites.find(
            { _id: req.body._id },
            { __v: 0, MobileNumber: 0 },
            function (err) {
                if (err) return res.sendStatus(401).send(err);
            }
        ).clone();
        delete req.body._id;
        delete req.body.MobileNumber;
        if (req.body.SitePassword) {
            req.body.SitePassword = await cryptr.encrypt(req.body.SitePassword);
        }
        const data = await Sites.findByIdAndUpdate(
            { _id: result[0]._id },
            req.body,
            function (err) {
                if (err) console.log(err);
            }
        ).clone();
        //console.log(data)
        data.SitePassword = await cryptr.decrypt(data.SitePassword);
        res.send(data);
    } catch (err) {
         res.json({ message: "abc" });
    }
};



//************************************************** *

//************************************************ */
//update 
// const update = (req,res,next) =>{
//     let URL = req.body.URL
//     let updatedData = ({
//         URL : req.body.URL,
//         SiteName : req.body.SiteName,
//         Sector : req.body.Sector,
//         UserName : req.body.UserName,
//         SitePassword : req.body.SitePassword,
//         Notes : req.body.Notes

//     })
//     Sites.findOneAndUpdate(URL, updatedData)
//     .then(()=> {
//         res.json({
//             message : 'Site updated successfully'
//         })
//     })
//     .catch(error=>{
//         res.json({
//             message: 'An error occured'
//         })

//     })
// }
module.exports = {
    index,show,store,editSite,search,searchSector

}