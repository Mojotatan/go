import initialState from '../initial-state';


// actions
import {SET_TILE, CHECK_TILE, KILL_TILE, DECHECK} from '../constants'

//action creators
export const setTile = (tile, color) => {return {type: SET_TILE, tile, color}}

export const checkTile = (tile, bool) => {return {type: CHECK_TILE, tile, bool}}

export const killTile = (tile) => {return {type: KILL_TILE, tile}}

export const decheck = () => {return {type: DECHECK}}


// reducer
export default function reducer (prevState = initialState, action) {
    let newState = Object.assign({}, prevState)
    switch (action.type) {
        case SET_TILE:
            if (prevState.board[action.tile].color === 'empty') {
                newState.turn = (prevState.turn === 'black') ? 'white' : 'black'
                console.log(newState.turn + ' player\'s turn')
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

        default:
        return newState
    }
}