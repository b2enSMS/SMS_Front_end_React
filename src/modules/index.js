import {combineReducers} from 'redux';
import contractmodal from './contractmodal';
import contracttable from './contracttable';
import contractcustomer from "./contractcustomer";
import contractcustomermodal from "./contractcustomermodal";


const rootReducer = combineReducers({
    contractmodal,contracttable,contractcustomer,contractcustomermodal,
});

export default rootReducer;