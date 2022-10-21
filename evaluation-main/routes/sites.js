const express = require('express')
const router = express.Router()

const siteController = require('../controllers/siteController')

router.get('/',siteController.index)
// to find one
router.post('/show',siteController.show)
// add
router.post('/store',siteController.store)
//router.post('/reset',siteController.reset)
//router.put('/update',siteController.update)

//updatebyid
router.put('/:id',siteController.updateSiteById)


module.exports = router 
//sites
//index,show,store,updatebyid