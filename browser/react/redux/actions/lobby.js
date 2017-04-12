// actions
import {NEW_GAME, CHOOSE_GAME, SET_NAME, LOAD_OPTIONS, SET_OPTIONS} from '../constants';

// action creators
export const setName = (name) => {return {type: SET_NAME, name}}

export const chooseGame = (game) => {return {type: CHOOSE_GAME, game}}

export const loadOptions = (game) => {return {type: LOAD_OPTIONS, game}}

export const setOptions = (option, value) => {return {type: SET_OPTIONS, option, value}}

export const newGame = (game, host) => {return {type: NEW_GAME, game, host}}

// reducer
const initialState = {
    games: [],
    game: 'default',
    gameOptions: {
        go: {
            boardSize: {
                options: [9, 13, 19],
                default: 19
            },
            color: {
                options: ['black', 'white'],
                default: 'black'
            }
        },
        default: {}
    },
    selectedOptions: [],
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
            newState.games.push({game: action.game, host: action.host})
            return newState

        case CHOOSE_GAME:
            newState.game = action.game
            return newState

        case LOAD_OPTIONS:
            newState.selectedOptions = loadDefault(newState.gameOptions[action.game])
            return newState

        case SET_OPTIONS:
            newState.selectedOptions = newState.selectedOptions.map(option => {
                return (option[action.option]) ? {[action.option]: action.value} : option
            })
            return newState

        case SET_NAME:
            newState.user = action.name
            return newState

        default:
            return newState
    }
}