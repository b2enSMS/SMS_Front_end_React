import axios from 'axios';

axios.defaults.baseURL = "http://localhost:9000/sms/api"
export const postContracts = (formData) => {
    const data = {
        orgId: formData.orgId,
        empId: formData.empId,
        contDt: formData.contDt,
        contTotAmt: formData.contTotAmt,
        delYn: formData.delYn,
        contReportNo: formData.contReportNo,
    }
    axios.post('/cont/create', data);
}

export const getOrganization = () =>
    axios.get('/org/showall');

export const getContracts = () =>
    axios.get('/cont/showall');

export const getOrgManager = () =>
    axios.get('/b2en/showall');

export const getManagers = () => {
    axios.get('customers/showall');
}