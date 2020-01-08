import {combineReducers} from 'redux';
import contractmodal from './contract/contractmodal';
import contracttable from './contract/contracttable';
import contracthistory from './contract/contracthistory';
import contractcustomertable from "./contractCustomer/contractcustomertable";
import licensemodal from "./contract/licensemodal";
import producttable from "./product/producttable";
import managertable from "./manager/managertable";
import companytable from "./company/companytable";
import productmodal from "./product/productmodal";
import possiblecustomertable from "./possibleCustomer/possiblecustomertable";
import managermodal from "./manager/managermodal";
import companymodal from "./company/companymodal";
import customertable from "./customer/customertable";
import possibletable from './possible/possibletable';
import possiblemodal from './possible/possiblemodal';
import possiblelicense from './possible/possiblelicense';
import possiblehistory from './possible/possiblehistory';
import meetingmodal from "./meeting/meetingmodal";
import meetingtable from "./meeting/meetingtable";
import customermodal from "./customer/customermodal";


const rootReducer = combineReducers({
    contractmodal,contracttable,licensemodal,producttable
    ,managertable,companytable,productmodal,contracthistory,
    possiblecustomertable,managermodal,companymodal,contractcustomertable,customertable,meetingmodal,meetingtable,possibletable,possiblemodal,possiblelicense,possiblehistory,customermodal
});

export default rootReducer;