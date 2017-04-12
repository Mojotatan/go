import store from './redux/store';
import {setStatus} from './redux/actions/board';
import {setName, newUser} from './redux/actions/lobby';

const socket = io(window.location.origin);

socket.on('connect', () => {
    console.log('Hooked up with server winky face')
})

socket.on('newUser', (user) => {
    console.log(`${user} has entered the lobby`)
})

socket.on('setName', () => {
    const user = prompt('Enter a user name') || 'No-name McLamerson';
    store.dispatch(setName(user))
    socket.emit('newUser', user)
})

socket.on('message', (message) => {
    console.log(`${message.user}: ${message.text}`)
})

socket.on('join', (status) => {
    // console.log(`You have joined as a ${status}`)
    store.dispatch(setStatus(status))
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
