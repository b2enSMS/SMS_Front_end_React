import {combineReducers} from 'redux';
import contractmodal from './contract/contractmodal';
import contracttable from './contract/contracttable';
import contractcustomer from "./contractCustomer/contractcustomer";
import contractcustomermodal from "./contractCustomer/contractcustomermodal";
import licensemodal from "./contract/licensemodal";
import customerupdatemodal from './contractCustomer/customerupdatemodal';
import producttable from "./product/producttable";
import managertable from "./manager/managertable";
import companytable from "./company/companytable";


const rootReducer = combineReducers({
    contractmodal,contracttable,contractcustomer,contractcustomermodal,licensemodal,customerupdatemodal,producttable
    ,managertable,companytable
});

export default rootReducer;