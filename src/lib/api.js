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
    }
    console.log("Data", data);
    axios.post('/cont/create', data);
}
//계약 테이블 - 리스트 삭제
export const getDeleteContracts = (selectedRowKeys) => {
    for (var i in selectedRowKeys) {
        axios.delete(`/cont/${selectedRowKeys[i]}`)
    }
}

//고객 등록
export const postCustomer = (formData) => {
    const data = {
        orgId: formData.orgId,
        orgNm: formData.orgNm,
        custId: formData.custId,
        custNm: formData.custNm,
        custRankNm: formData.custRankNm,
        email: formData.email,
        telNo: formData.telNo,
    }
    axios.post('/cust/create', data);
}
//기관 리스트
export const getOrganization = () =>
    axios.get('/org/showall');

//계약 리스트
export const getContracts = () =>
    axios.get('/cont/showall');
//비투엔 담당자 리스트
export const getB2enManager = () =>
    axios.get('/b2en/showall');

//기관 담당자 리스트
export const getManagers = () => {
    axios.get('/customers/showall');
}

export const getProducts = () =>
    axios.get('/prdt/showall');

export const getLicenseCode= ()=>{
    axios.get('/code/license');
}
