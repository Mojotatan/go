import store from './redux/store';
import {setStatus} from './redux/actions/board';

const socket = io(window.location.origin);

socket.on('connect', () => {
    console.log('Hooked up with server winky face')
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
