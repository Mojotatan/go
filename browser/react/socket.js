import store from './redux/store';
import {setStatus} from './redux/actions/board';
import {allUsers, newUser} from './redux/actions/lobby';

const socket = io(window.location.origin);

socket.on('connect', () => {
    console.log('Hooked up with server winky face')
})

socket.on('newUser', (obj) => {
    console.log('client received newUser')
    store.dispatch(newUser(obj.users, obj.index))
})

socket.on('updateUsers', (users) => {
    console.log('client received updateUsers')
    store.dispatch(allUsers(users))
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
