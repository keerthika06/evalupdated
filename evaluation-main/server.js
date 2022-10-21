const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require("dotenv")
dotenv.config()












const userRoute = require('./routes/user')
const siteRoute = require('./routes/sites')
const AuthRoute = require('./routes/auth')
const { logout } = require('./controllers/userController')
//const userRoute = require('./routes/user')
//const authenticate =require('./middleware/authenticate')


mongoose.connect('mongodb://localhost:27017/eval')
const db = mongoose.connection
const app = express()

db.on('error', (err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log("database conncetion established")
})

//const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT = process.env.PORT ||3000

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)

})


//app.use('/api/login',authenticate)
app.use('/api/user', userRoute)
app.use('/api',AuthRoute)
app.use('/api/site',siteRoute)
//app.use('/api/user',userRoute)

