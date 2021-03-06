import initialState from '../initial-state';


// actions
import {SET_TILE, CHECK_TILE, KILL_TILE, DECHECK, SET_STATUS, INITIALIZE_BOARD, JOIN, ADVANCE_GAME} from '../constants'

//action creators
export const setTile = (tile, color) => {return {type: SET_TILE, tile, color}}

export const checkTile = (tile, bool) => {return {type: CHECK_TILE, tile, bool}}

export const killTile = (tile) => {return {type: KILL_TILE, tile}}

export const decheck = () => {return {type: DECHECK}}

export const setStatus = (status) => {return {type: SET_STATUS, status}}

export const initializeBoard = (size, turn, prevMove) => {return {type: INITIALIZE_BOARD, size, turn, prevMove}}

export const join = () => {return {type: JOIN}}

export const advanceGame = (board) => {return {type: ADVANCE_GAME, board}}


// reducer
export default function reducer (prevState = initialState(19, 'black', 'START'), action) {
    let newState = Object.assign({}, prevState)
    switch (action.type) {
        case INITIALIZE_BOARD:
            newState = initialState(action.size, action.turn, action.prevMove)
            return newState

        case SET_TILE:
            newState.turn = (prevState.turn === 'black') ? 'white' : 'black'
            if (action.tile !== 'pass') {
                newState.board[action.tile].color = action.color
            }
            newState.prevMove = action.tile
            return newState

        case CHECK_TILE:
            newState.board[action.tile].checked = action.bool
            return newState
        
        case KILL_TILE:
            newState.board[action.tile].color = 'empty'
            return newState
        
        case DECHECK:
            for (let spot in newState.board) {
                newState.board[spot].checked = false;
            }
            return newState

        case SET_STATUS:
            if (action.status === 'spectator') {
                newState.playerColor = null
            } else {
            newState.playerColor = action.status
            }
            return newState
        
        case JOIN:
            newState.player++
            return newState

        case ADVANCE_GAME:
            newState.board = action.board
            return newState

        default:
        return newState
    }
}