import {combineReducers} from 'redux';
import board from './actions/board';
import lobby from './actions/lobby';

export default combineReducers({lobby, board})
