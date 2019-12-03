import axios from 'axios';


const SERVER_URL = "http://sms/api"
export const postContracts = (formData) => {
    const data = {
        orgId: formData.orgId,
        empId: formData.empId,
        contDt: formData.contDt,
        contTotAmt: formData.contTotAmt,
        delYn: formData.delYn,
        contReportNo: formData.contReportNo,
    }
    axios.post(SERVER_URL+'/cont/create', data);
}

export const getOrganization = () =>
    axios.get(SERVER_URL+'/org/showall');

export const getContracts = () =>
    axios.get(SERVER_URL+'/cont/showall');

export const getOrgManager = () =>
    axios.get(SERVER_URL+'/b2en/showall');


export const getManagers = () => {
    axios.get(SERVER_URL+'customers/showall');
}