import initialState from '../initial-state';


// actions
import {SET_TILE, CHECK_TILE, KILL_TILE, DECHECK, SET_STATUS} from '../constants'

//action creators
export const setTile = (tile, color) => {return {type: SET_TILE, tile, color}}

export const checkTile = (tile, bool) => {return {type: CHECK_TILE, tile, bool}}

export const killTile = (tile) => {return {type: KILL_TILE, tile}}

export const decheck = () => {return {type: DECHECK}}

export const setStatus = (status) => {return {type: SET_STATUS, status}}


// reducer
export default function reducer (prevState = initialState, action) {
    let newState = Object.assign({}, prevState)
    switch (action.type) {
        case SET_TILE:
            if (prevState.board[action.tile].color === 'empty') {
                newState.turn = (prevState.turn === 'black') ? 'white' : 'black'
            }
            newState.board[action.tile].color = (prevState.board[action.tile].color === 'empty') ? action.color : 'empty'
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
            newState.playerColor = (action.status === 'black player') ? 'black' : 'white'
            }
            return newState

        default:
        return newState
    }
}