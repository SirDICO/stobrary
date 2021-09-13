//check if application is runing in production environ
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express();
const expressLayout = require('express-ejs-layouts')

//link the router folder here
const indexRouter = require('./routes/index')

//set up your views
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))

//DB connections
const mongoose  = require('mongoose')  
mongoose.connect(process.env.DATABASE_URL)   

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose Db'))


//call index route
app.use('/', indexRouter)

//listent to server port
app.listen(process.env.PORT || 5000)