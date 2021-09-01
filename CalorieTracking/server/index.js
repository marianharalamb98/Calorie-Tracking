const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000
const {mongoUrl} = require('./keys')


require('./models/User');
require('./models/Meal');
const requireToken = require('./middleware/requireToken')
const authRoutes = require('./routes/authRoutes')
app.use(bodyParser.json())
app.use(authRoutes)



mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("Connected to mongo")
})

mongoose.connection.on('error',(err)=>{
    console.log("this is error",err)
})

app.get('/',requireToken,(req,res)=>{
    res.send("Your email is "+ req.user.email)
})



app.listen(PORT,()=>{
    console.log("Server running" + PORT)
})