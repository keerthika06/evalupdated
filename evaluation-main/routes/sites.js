const express = require('express')
const router = express.Router()
const authenticate = require("../middleware/authenticate")

const siteController = require('../controllers/siteController')

router.get('/',siteController.index)
// to find one
router.post('/show',siteController.show)
// add
router.post('/store',authenticate , siteController.store)
//router.post('/reset',siteController.reset)
//router.put('/update',siteController.update)
//search
router.get("/search", authenticate, siteController.search);
router.get("/searchSector", authenticate, siteController.searchSector);

//updatebyid
router.put('/:id',siteController.updateSiteById)


module.exports = router 
//sites
//index,show,store,updatebyid