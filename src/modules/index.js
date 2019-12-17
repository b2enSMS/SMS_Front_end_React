import {combineReducers} from 'redux';
import contractmodal from './contract/contractmodal';
import contracttable from './contract/contracttable';
import contractcustomer from "./contractCustomer/contractcustomer";
import contractcustomermodal from "./contractCustomer/contractcustomermodal";
import licensemodal from "./contract/licensemodal";
import customerupdatemodal from './contractCustomer/customerupdatemodal';


const rootReducer = combineReducers({
    contractmodal,contracttable,contractcustomer,contractcustomermodal,licensemodal,customerupdatemodal,
});

export default rootReducer;