import {combineReducers} from 'redux';
import contractmodal from './contract/contractmodal';
import contracttable from './contract/contracttable';
import contracthistory from './contract/contracthistory';
import contractcustomertable from "./contractCustomer/contractcustomertable";
import contractcustomermodal from "./contractCustomer/contractcustomermodal";
import licensemodal from "./contract/licensemodal";
import producttable from "./product/producttable";
import managertable from "./manager/managertable";
import companytable from "./company/companytable";
import productupdatemodal from "./product/productupdatemodal";
import managermodal from "./manager/managermodal"
import possiblecustomermodal from "./possibleCustomer/possiblecustomermodal";
import possiblecustomertable from "./possibleCustomer/possiblecustomertable";
import companymodal from "./company/companymodal";
import customertable from "./customer/customertable";


const rootReducer = combineReducers({
    contractmodal,contracttable,contractcustomermodal,licensemodal,producttable
    ,managertable,companytable,productupdatemodal,contracthistory,possiblecustomermodal,
    possiblecustomertable,managermodal,companymodal,contractcustomertable,customertable

});

export default rootReducer;