import axios from 'axios';

axios.defaults.baseURL = "/sms/api";
//(개발할 때) npm start를 하면 NODE_ENV 값이 development가 들어가고 
//(운영할 때) npm run build를 하면 NODE_ENV 값이 다른 값이 들어간다. 
if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = "http://localhost:9000/sms/api";
}
export const postContracts = (formData) => {
    const data = {
        orgId: formData.orgId,
        empId: formData.empId,
        contDt: formData.contDt,
        installDt: formData.installDt,
        mtncStartDt: formData.mtncStartDt,
        mtncEndDt: formData.mtncEndDt,
        contReportNo: formData.contReportNo,
        lcnsNo: formData.lcnsNo,
    }
    console.log("Data", data);
    axios.post('/cont/create', data);
}

export const getDeleteContracts = (deleteData) => {
    const headers = {
        'Authorization': '***'
      }

    for (var data in deleteData) {
        const del = {
            contid: data
        }
        axios.delete('/cont',{headers,del});
    }
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