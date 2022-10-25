const express = require('express')
const router = express.Router()
const authenticate = require("../middleware/authenticate")

const siteController = require('../controllers/siteController')

router.get('/',authenticate,siteController.index)
// to find one
router.post('/show',authenticate,siteController.show)
// add
router.post('/store',authenticate , siteController.store)
//router.post('/reset',siteController.reset)
//router.put('/update',siteController.update)
//search
router.get("/search", authenticate, siteController.search);
router.get("/searchSector", authenticate, siteController.searchSector);

//updatebyid
router.put('/editSite',authenticate,siteController.editSite)


module.exports = router 
//sites
//index,show,store,updatebyid