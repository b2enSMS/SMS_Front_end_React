import axios from 'axios';

export const postContracts = (formData) => {
    const data = {
        orgId: formData.orgId,
        empId: formData.empId,
        contDt: formData.contDt,
        contTotAmt: formData.contTotAmt,
        delYn: formData.delYn,
        contReportNo: formData.contReportNo,
    }
    console.log("postContracts", data)
    axios.post('/helloSpringBoot-0.0.1-SNAPSHOT/api/cont/create', data);
}

export const getOrganization = () =>
    axios.get('/helloSpringBoot-0.0.1-SNAPSHOT/api/org/showall');

export const getContracts = () =>
    axios.get('/helloSpringBoot-0.0.1-SNAPSHOT/api/cont/showall');

export const getOrgManager = () =>
    axios.get('/helloSpringBoot-0.0.1-SNAPSHOT/api/b2en/showall');


export const getManagers = () => {
    axios.get('/helloSpringBoot-0.0.1-SNAPSHOT/customers/showall');
}