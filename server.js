const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path')

const app = express();
const server = app.listen(3000, () => {console.log('Ready to go on port 3000')})

const socketio = require('socket.io')
const io = socketio(server)

// event handlers and emitters for socket
let hosts = {};
let players = [null, null];

// giving up on lobby lol
io.on('connection', function(socket) {

    console.log('A user has connected @', socket.id)

    socket.emit('setName')

    if (!players[0]) {
        socket.emit('join', 'black')
        players[0] = socket.id
    } else if (!players[1]) {
        socket.emit('join', 'white')
        players[1] = socket.id
    } else {socket.emit('join', 'spectator')}

    socket.on('newUser', (user) => {
        socket.broadcast.emit('newUser', user)
    })

    socket.on('message', (message) => {
        socket.broadcast.emit('message', message)
    })

    socket.on('newGame', (obj) => {
        hosts[obj.host] = socket.id
        socket.broadcast.emit('newGame', obj)
    })

    socket.on('join', (obj) => {
        let channel = obj.num
        socket.join(channel)
        socket.to(channel).emit('newNewUser', `${obj.user} joined the game`)
    })

    // socket.on('joinGame', (host) => {
    //     socket.to(hosts[host]).emit('joinGame', hosts[host])
    // })

    // socket.on('megaJoin', (data) => {
    //     console.log('processing', data)
    //     socket.to(data.id).emit('megaJoin', data)
    // })

    socket.on('play', (action) => {
        socket.broadcast.emit('play', action)
    })

    socket.on('kill', (action) => {
        socket.broadcast.emit('kill', action)
    })

    socket.on('finalScore', (score) => {
        socket.broadcast.emit('finalScore', score)
    })

    socket.on('disconnect', () => {
        console.log('A user left @', socket.id)
        if (players.includes(socket.id)) {
            players[players.indexOf(socket.id)] = null
        }
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