// actions
import {NEW_GAME, SET_NAME, LOAD_OPTIONS, SET_OPTIONS} from '../constants';

// action creators
export const setName = (name) => {return {type: SET_NAME, name}}

export const loadOptions = (game) => {return {type: LOAD_OPTIONS, game}}

// reducer
const initialState = {
    games: [],
    gameOptions: {
        go: {
            boardSize: {
                options: [9, 13, 19],
                default: 19
            },
        },
        default: {}
    },
    selectedOptions: {},
    user: 'user'
}

// utility function for loading a game's options
const loadDefault = (game) => {
    return Object.keys(game).map(option => {return {[option]: game[option].default}})
}

export default function reducer (prevState = initialState, action) {
    let newState = Object.assign({}, prevState)
    switch (action.type) {
        case NEW_GAME:
            return newState

        case LOAD_OPTIONS:
            newState.selectedOptions = loadDefault(newState.gameOptions[action.game])
            return newState

        case SET_OPTIONS:
            return newState

        case SET_NAME:
            newState.user = action.name
            return newState

        default:
        return newState
    }
}