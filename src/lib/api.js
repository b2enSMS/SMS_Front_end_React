import axios from 'axios';

axios.defaults.baseURL = "/sms/api";
//(개발할 때) npm start를 하면 NODE_ENV 값이 development가 들어가고 
//(운영할 때) npm run build를 하면 NODE_ENV 값이 다른 값이 들어간다. 
if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = "http://localhost:9000/sms/api";
}


//이미지 삭제
export const getRemoveImage = (fileList) => {
    if(fileList && fileList.length>0){
        console.log('api: getRemoveImage',fileList,{ idx: fileList})
        return axios.delete(`/scan`, { data: { idx: fileList} })
    }
}

//계약 등록
export const postContracts = (formData) => {
    console.log("formData야야야야ㅑ", formData.lcns)
    const data = {
        prdtId: formData.prdtId,
        checkDt: formData.checkDt,
        lcns: formData.lcns,
        orgId: formData.orgId,
        empId: formData.empId,
        contDt: formData.contDt,
        installDt: formData.installDt,
        mtncStartDt: formData.mtncStartDt,
        mtncEndDt: formData.mtncEndDt,
        contReportNo: formData.contReportNo,
        contTpCd: formData.contTpCd,
        custId: formData.custId,
        HeadContIdAC: formData.HeadContIdAC,
        contNm: formData.contNm,

    }
    return axios.post('/cont/create', data);
}


export const updatePossible = (formData) => {
    const data = {

    }
    axios.put(`/temp/${formData.tempVerId}`, data);
}
export const postUpdateContracts = (formData) => {
    console.log("formData야야야야ㅑ", formData.lcns)
    const data = {
        prdtId: formData.prdtId,
        checkDt: formData.checkDt,
        lcns: formData.lcns,
        orgId: formData.orgId,
        empId: formData.empId,
        contDt: formData.contDt,
        installDt: formData.installDt,
        mtncStartDt: formData.mtncStartDt,
        mtncEndDt: formData.mtncEndDt,
        contReportNo: formData.contReportNo,
        contTpCd: formData.contTpCd,
        custId: formData.custId,
        HeadContIdAC: formData.HeadContIdAC,
        contNm: formData.contNm,
    }
    return axios.put(`/cont/${formData.contId}`, data);
}

//계약 테이블 - 리스트 삭제
export const getDeleteContracts = (selectedRowKeys) => {
    console.log("selected", selectedRowKeys)

    return axios.delete(`/cont`, { data: { idx: selectedRowKeys } })
}

// 고객 하나씩 가져오기
export const getCust = (custId) =>
    axios.get(`/cust/${custId}`)

//고객 코드
export const getcustCD = () =>
    axios.get('/cmmncd/cust_tp_cd');

//고객 테이블 - 삭제
export const deleteCustomer = (selectedRowKeys) => {
    return axios.delete(`/cust`, { data: { idx: selectedRowKeys } })
}

// 고객 수정
export const updateCustomer = (formData) => {
    console.log("fdsfefgdf", formData);
    const data = {
        orgId: formData.orgId,
        orgNm: formData.orgNm,
        custNm: formData.custNm,
        custRankNm: formData.custRankNm,
        email: formData.email,
        telNo: formData.telNo,
        custTpCd: formData.custTpCd,
    }
    return axios.put(`/cust/${formData.custId}`, data);
}

//고객 등록
export const postCustomer = (formData) => {
    console.log("나는", formData.custTpCd)
    const data = {
        orgId: formData.orgId,
        orgNm: formData.orgNm,
        custId: formData.custId,
        custNm: formData.custNm,
        custRankNm: formData.custRankNm,
        email: formData.email,
        telNo: formData.telNo,
        custTpCd: formData.custTpCd,
    }
    return axios.post('/cust/create', data);
}

export const getCustList = () => {
    return axios.get('/cust/showall');
}

// 계약고객 리스트
export const getContractCustomerList = () => {
     return axios.get('/cust/cont');
}

export const getPresaleCustomerList = () => {
    return axios.get('/cust/presale')
}

export const postManager = (formData) => {
    const data = {
        empNm: formData.empNm,
        email: formData.email,
        telNo: formData.telNo,
    }
    return axios.post('/b2en/create', data);
}

export const updateManager = (formData) => {
    const data = {
        empNm: formData.empNm,
        email: formData.email,
        telNo: formData.telNo,
    }
    return axios.put(`/b2en/${formData.empId}`, data);
}

export const postPossible = (formData) => {
    const data = {

    }
    return axios.post('temp/create,', data);
}

export const postProduct = (formData) => {
    const data = {
        prdtId: formData.prdtId,
        prdtNm: formData.prdtNm,
        prdtAmt: formData.prdtAmt,
        prdtDesc: formData.prdtDesc,
    }
    return axios.post('/prdt/create', data);
}

export const updateProduct = (formData) => {
    const data = {
        prdtNm: formData.prdtNm,
        prdtAmt: formData.prdtAmt,
        prdtDesc: formData.prdtDesc,
    }
    return axios.put(`/prdt/${formData.prdtId}`, data);
}

//모계약 리스트
export const getheadConts = () =>
    axios.get('/cont/aclist')

//계약
export const getContract = (key) =>
    axios.get(`/cont/${key}`);

export const getPossibleContractList = () =>
    axios.get('/temp/showall');


export const getHistoryList = (contId) =>
    axios.get(`cont/hist/${contId}`);

export const getPossibleContract = (key) =>
    axios.get(`/temp/${key}`);

//기관 리스트
export const getOrganization = () =>
    axios.get('/org/aclist');

//계약 리스트
export const getContracts = () =>
    axios.get('/cont/showall');

//비투엔 담당자 이름 리스트
export const getB2enManager = () =>
    axios.get('/b2en/aclist');

//기관 담당자 리스트
export const getManagers = () =>
    axios.get('/cust/showall');

//기관 담당자 이름 리스트
export const getorgML = () =>
    axios.get('/cust/aclist');
    
//계약 코드 리스트
export const getcontCD = () =>
    axios.get('/cmmncd/cont_tp_cd');

export const getProducts = () =>
    axios.get('/prdt/aclist');

//라이센스 코드
export const getLicenseCode = () =>
    axios.get('/cmmncd/lcns_tp_cd');

// 제품 리스트
export const getProductList = () =>
    axios.get('/prdt/showall');

export const getProduct = (prdtId) =>
    axios.get(`/prdt/${prdtId}`);

// 제품 삭제
export const getDeleteProducts = (selectedRowKeys) => {
    console.log("selected", selectedRowKeys)

    return axios.delete(`/prdt`, { data: { idx: selectedRowKeys } })
}

export const deletePossibleContract = (selectedRowKeys) => {
    return axios.delete(`/temp`, {data: {idx: selectedRowKeys}})
}

export const deleteB2enManager = (selectedRowKeys) =>
    axios.delete(`/b2en`,{data: {idx: selectedRowKeys}})

// b2en 담당자 리스트
export const getManagerList = () =>
    axios.get('/b2en/showall');

export const getManager = (empNo) =>
    axios.get(`/b2en/${empNo}`)

export const getCompanyList = () =>
    axios.get('/org/showall');

export const deleteCompany = (selectedRowKeys) => {
    axios.delete('/org',{data: {idx: selectedRowKeys}})
}

export const getOrgList = () => {
    return axios.get('/org/showall');
}

export const getOrg = (orgId) => {
    return axios.get(`/org/${orgId}`);
}

export const updateOrg = (formData) => {
    const data = {
        orgNm: formData.orgNm,
        orgAddr: formData.orgAddr
    }
    axios.put(`/org/${formData.orgId}`, data);
}

export const postOrg = (formData) => {
    const data = {
        orgNm: formData.orgNm,
        orgAddr: formData.orgAddr
    }
    axios.post(`/org/create`, data);
}

export const getMeetingList = () => {
    return axios.get('/meet/showall');
}

export const deleteMeeting = (selectedRowKeys) => {
    axios.delete(`/meet`, {data: {idx: selectedRowKeys}});
}