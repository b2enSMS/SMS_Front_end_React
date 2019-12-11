import {combineReducers} from 'redux';
import contractmodal from './contractmodal';
import contracttable from './contracttable';
import contractcustomer from "./contractcustomer";
import contractcustomermodal from "./contractcustomermodal";
import customerupdatemodal from "./customerupdatemodal";
import licensemodal from "./licensemodal";


const rootReducer = combineReducers({
    contractmodal,contracttable,contractcustomer,contractcustomermodal,licensemodal,customerupdatemodal


});

export default rootReducer;