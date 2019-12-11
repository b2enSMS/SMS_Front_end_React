import {combineReducers} from 'redux';
import contractmodal from './contractmodal';
import contracttable from './contracttable';
import contractcustomer from "./contractcustomer";
import contractcustomermodal from "./contractcustomermodal";
import customerupdatemodal from "./customerupdatemodal";


const rootReducer = combineReducers({
    contractmodal,contracttable,contractcustomer,contractcustomermodal,customerupdatemodal
});

export default rootReducer;