const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate, userController.index)
router.post('/show',userController.show)
router.post('/store',userController.store)
router.put('/update',userController.update)
//router.post('/logout',authenticate,userController.logout)

// router.get('/logout', authenticate, async(req, res)=>{

//     try{

//         req.user.tokens = req.user.tokens.filter((token)=>{

//             return token.token !== req.token

//         })

//         await req.user.save()

//         res.send()

//     }catch(e){

//         res.status(500).send()

//     }

// })









// router.get('/logout', async(req, res)=>{

//     try{

//         req.user.tokens = req.user.tokens.filter((token)=>{

//             return token.token !== req.token

//         })

//         await req.user.save()

//         res.send()

//     }catch(e){

//         res.status(500).send()

//     }

// })

module.exports = router 