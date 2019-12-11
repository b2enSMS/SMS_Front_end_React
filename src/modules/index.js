import {combineReducers} from 'redux';
import contractmodal from './contractmodal';
import contracttable from './contracttable';
import contractcustomer from "./contractcustomer";
import contractcustomermodal from "./contractcustomermodal";
import licensemodal from "./licensemodal";


const rootReducer = combineReducers({
    contractmodal,contracttable,contractcustomer,contractcustomermodal,licensemodal,
});

export default rootReducer;