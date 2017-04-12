const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path')

const app = express();
const server = app.listen(3000, () => {console.log('Ready to go on port 3000')})

const socketio = require('socket.io')
const io = socketio(server)

// event handlers and emitters for socket
io.on('connection', function(socket) {
    // players = assignPlayer(players, socket.id)
    // let clientStatus;
    // if (players.includes(socket.id)) {
    //     clientStatus = (players[0] === socket.id) ? 'black player' : 'white player'
    // } else {
    //     clientStatus = 'spectator'
    // }

    console.log('A user has connected @', socket.id)

    // socket.emit('join', clientStatus)

    socket.emit('setName')

    socket.on('newUser', (user) => {
        socket.broadcast.emit('newUser', user)
    })

    socket.on('message', (message) => {
        socket.broadcast.emit('message', message)
    })

    socket.on('play', (action) => {
        socket.broadcast.emit('play', action)
    })

    socket.on('kill', (action) => {
        socket.broadcast.emit('kill', action)
    })

    socket.on('disconnect', () => {
        console.log('A user left @', socket.id)
        // users[newUser.index].active = false
        // if (clientStatus !== 'spectator') {
        //     players[players.indexOf(socket.id)] = null
        // }
    })
})

// middleware
app.use(morgan('tiny'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('browser'))

// if routes are later needed for fleshing out
// const router = require('./routes')
// app.use('/', router)

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'browser', 'index.html'))
})


//todo: error handler (make sure it works)
// app.use(function(err, req, res, next) {
//     console.error(err)
//     next()
// })