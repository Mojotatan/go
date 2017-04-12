import store from './redux/store';
import {setStatus, initializeBoard, advanceGame, join} from './redux/actions/board';
import {setName, newUser, newGame} from './redux/actions/lobby';

const socket = io(window.location.origin);

socket.on('connect', () => {
    console.log('Hooked up with server winky face')
})

socket.on('newUser', (user) => {
    console.log(`${user} has entered the lobby`)
})

socket.on('setName', () => {
    //ENABLE THIS FOR 'PRODUCTION'
    // const user = prompt('Enter a user name') || 'No-name McLamerson';
    const user = 'buttlet';
    store.dispatch(setName(user))
    socket.emit('newUser', user)
})

socket.on('message', (message) => {
    console.log(`${message.user}: ${message.text}`)
})

socket.on('newGame', (obj) => {
    console.log(`${obj.host} is hosting a game of ${obj.game}`)
    store.dispatch(newGame(obj.game, obj.host))
})

socket.on('join', (status) => {
    // console.log(`You have joined as a ${status}`)
    store.dispatch(setStatus(status))
})

socket.on('joinGame', (id) => {
    console.log('join request received')
    const state = store.getState()
    let role;
    if (state.board.players < 2) {
        role = (state.board.playerColor === 'black') ? 'white' : 'black';
    } else {
        role = 'spectator'
    }
    store.dispatch(join())
    socket.emit('megaJoin', {id, /*board: state.board.board,*/ size: state.board.size, prevMove: state.board.prevMove, turn: state.board.turn, role})
})

socket.on('megaJoin', (data) => {
    console.log('join request approved')
    store.dispatch(initializeBoard(data.size, data.turn, data.prevMove))
    // store.dispatch(advanceGame(data.board))
    store.dispatch(setStatus(data.role))
})

socket.on('play', (action) => {
    // console.log('Your opponent makes their move')
    store.dispatch(action)
})

socket.on('kill', (action) => {
    // console.log('A piece falls!')
    store.dispatch(action)
})

export default socket
