import {combineReducers} from 'redux';
import contractmodal from './contract/contractmodal';
import contracttable from './contract/contracttable';
import contracthistory from './contract/contracthistory';
import contractcustomer from "./contractCustomer/contractcustomer";
import contractcustomermodal from "./contractCustomer/contractcustomermodal";
import licensemodal from "./contract/licensemodal";
import customerupdatemodal from './contractCustomer/customerupdatemodal';
import producttable from "./product/producttable";
import managertable from "./manager/managertable";
import companytable from "./company/companytable";
import productupdatemodal from "./product/productupdatemodal";
import managermodal from "./manager/managermodal"



const rootReducer = combineReducers({
    contractmodal,contracttable,contractcustomer,contractcustomermodal,licensemodal,customerupdatemodal,producttable
    ,managertable,companytable,productupdatemodal,contracthistory,managermodal

});

export default rootReducer;