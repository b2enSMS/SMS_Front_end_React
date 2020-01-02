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
import possiblecontracttable from "./possible/possiblecontracttable";
import possiblecontractmodal from "./possible/possiblecontractmodal";
import possiblecustomermodal from "./possibleCustomer/possiblecustomermodal";
import possiblecustomertable from "./possibleCustomer/possiblecustomertable";
import managermodal from "./manager/managermodal";
import companymodal from "./company/companymodal";
import customertable from "./customer/customertable";
import meetingmodal from "./meeting/meetingmodal"
import meetingtable from "./meeting/meetingtable"

const rootReducer = combineReducers({
    contractmodal,contracttable,contractcustomermodal,licensemodal,producttable
    ,managertable,companytable,productupdatemodal,possiblecontracttable,possiblecontractmodal,contracthistory,possiblecustomermodal,
    possiblecustomertable,managermodal,companymodal,contractcustomertable,customertable,meetingmodal,meetingtable,

});

export default rootReducer;