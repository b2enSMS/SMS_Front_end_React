import {combineReducers} from 'redux';
import contmodal from './contract/contmodal';
import conttable from './contract/conttable';
import conthist from './contract/conthist';
import contcusttable from "./contractCustomer/contcusttable";
import licensemodal from "./contract/licensemodal";
import producttable from "./product/producttable";
import managertable from "./manager/managertable";
import orgtable from "./organization/orgtable";
import productupdatemodal from "./product/productupdatemodal";
import possiblecustomermodal from "./possibleCustomer/possiblecustomermodal";
import possiblecustomertable from "./possibleCustomer/possiblecustomertable";
import managermodal from "./manager/managermodal";
import orgmodal from "./organization/orgmodal";
import customertable from "./customer/customertable";
import possibletable from './possible/possibletable';
import possiblemodal from './possible/possiblemodal';
import possiblelicense from './possible/possiblelicense';
import possiblehist from './possible/possiblehist';
import meetingmodal from "./meeting/meetingmodal";
import meetingtable from "./meeting/meetingtable";
import customermodal from "./customer/customermodal";


const rootReducer = combineReducers({
    contmodal,conttable,licensemodal,producttable
    ,managertable,orgtable,productupdatemodal,conthist,possiblecustomermodal,
    possiblecustomertable,managermodal,orgmodal,contcusttable,customertable,meetingmodal,meetingtable,possibletable,possiblemodal,possiblelicense,possiblehist,customermodal
});

export default rootReducer;