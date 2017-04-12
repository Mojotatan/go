const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path')

const app = express();
const server = app.listen(3000, () => {console.log('Ready to go on port 3000')})

const socketio = require('socket.io')
const io = socketio(server)

// event handlers and emitters for socket
let players = [null, null];
const assignPlayer = (players, id) => {
    let add = false;
    return players.map(player => {
        if (player || add) {return player}
        else {
            add = true;
            return id
        }
    })
}
let users = [];

io.on('connection', function(socket) {
    // players = assignPlayer(players, socket.id)
    // let clientStatus;
    // if (players.includes(socket.id)) {
    //     clientStatus = (players[0] === socket.id) ? 'black player' : 'white player'
    // } else {
    //     clientStatus = 'spectator'
    // }

    // console.log(`A new ${clientStatus} has connected`)

    // socket.emit('join', clientStatus)


    let newUser = {id: socket.id, name: 'user ' + users.length, active: true, index: users.length}
    // const userGuy = (id) => {
    //     return users.filter(user => {
    //         return user.id = id
    //     })[0]
    // }

    console.log(`${newUser.name} connected`)
    users.push(newUser)
    socket.emit('newUser', {users, index: users.length - 1})
    socket.broadcast.emit('newUser', {users, index: users.length - 1})
    // console.log('current users:', users)
    // console.log('this guy', socket.id, newUser)

    socket.on('userEdit', (obj) => {
        console.log('server receieved userEdit')
        // users = users.map(user => {
        //     return (newUser.id === user.id) ? {id: user.id, name: name} : user
        // })
        users[obj.index].name = obj.name
        // console.log('current users:', users)
        // console.log('this guy', socket.id, newUser)
        socket.broadcast.emit('updateUsers', users)
    })

    socket.on('play', (action) => {
        socket.broadcast.emit('play', action)
    })

    socket.on('kill', (action) => {
        socket.broadcast.emit('kill', action)
    })

    socket.on('disconnect', () => {
        console.log(`${newUser.name} left`)
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