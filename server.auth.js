const express = require('express')
const exphbs = require('express-handlebars')
const routersHome = require("./routers/home.auth.r")
var session = require('cookie-session')
require('dotenv').config()
const app = express()
const port = process.env.PORT_AUTH || 20157
require('./configs/passport.js')(app)

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'container.hbs',
    layoutsDir: 'views/_layouts',
    partialsDir: 'views/_partials.auth',
}));
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/db/pid'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/',routersHome)
app.use((err,req,res,next)=>{
    const status=err.status | 500
    res.status(status).send(err.message)
})

app.listen(port,()=>console.log(`Running Auth app in port ${port}`))
