// actions
import {NEW_GAME, ALL_USERS, SET_NAME, NEW_USER} from '../constants';

// action creators

export const allUsers = (users) => {return {type: ALL_USERS, users}}

export const newUser = (users, index) => {return {type: NEW_USER, users, index}}

export const setName = (name) => {return {type: SET_NAME, name}}

// reducer
const initialState = {games: [], users: [{name: 'steve', id: 3}], userIndex: 0}
export default function reducer (prevState = initialState, action) {
    let newState = Object.assign({}, prevState)
    switch (action.type) {
        case NEW_GAME:
            return newState

        case NEW_USER:
            newState.users = action.users
            // console.log('(all users) set name to', action.users[action.index].name)
            newState.userIndex = action.index
            return newState

        case ALL_USERS:
            newState.users = action.users
            return newState

        case SET_NAME:
            // console.log('(set name) set name to', action.name)
            newState.users[newState.userIndex].name = action.name
            return newState

        default:
        return newState
    }
}