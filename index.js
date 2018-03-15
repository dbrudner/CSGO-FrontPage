
const express  = require('express');
const app = express();
const port = process.env.PORT || 5000;

const bodyParser   = require('body-parser');
const path = require('path')

const http = require('http')
const socketIO = require('socket.io')

const server = http.createServer(app)

const io = socketIO(server)

app.use(express.static(path.join(__dirname, 'react/build')));




// routes ======================================================================h
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

// socket io connection ======================================================================h

io.on('connection', socket => {
    console.log('User connected')
    
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

// launch ======================================================================
server.listen(port, () => console.log(`Listening on port ${port}`))

console.log('Listening on port ' + port);