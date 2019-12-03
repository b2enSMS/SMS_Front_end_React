import {combineReducers} from 'redux';
import contractmodal from './contractmodal';
import contracttable from './contracttable';


const rootReducer = combineReducers({
    contractmodal,contracttable
});

export default rootReducer;