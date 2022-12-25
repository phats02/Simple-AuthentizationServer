const express = require('express')
const exphbs = require('express-handlebars')
const routersHome = require("./routers/home.r")
var session = require('cookie-session')
require('dotenv').config()
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT_SHOP || 20157
require('./configs/passport.js')(app)
const routerChat = require("./routers/chat.r")
const routerUser=require('./routers/user.r')

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'container.hbs',
    layoutsDir: 'views/_layouts',
    partialsDir: 'views/_partials',
}));
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/db/pid'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/home', routersHome)
app.use('/chat', routerChat)
app.use('/', routerUser)

app.use((err, req, res, next) => {
    const status = err.status | 500
    res.status(status).send(err.message)
})
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('send-picture', (pictureData) => {
        io.emit('picture', pictureData.toString('base64'));
      });
});
server.listen(port, () => console.log(`Running Shop app in port ${port}`))
