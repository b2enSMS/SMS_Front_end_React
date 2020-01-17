import axios from 'axios';
import { message } from 'antd'

axios.defaults.baseURL = "/sms/api";
//(개발할 때) npm start를 하면 NODE_ENV 값이 development가 들어가고 
//(운영할 때) npm run build를 하면 NODE_ENV 값이 다른 값이 들어간다. 
if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = "http://localhost:9000/sms/api";
}
// 응답 인터셉터 추가
axios.interceptors.response.use(
    function (response) {
        console.log("success Response", response)
        if (response.config.method === "get") {

        } else {
            message.success(response.data[0].info)
        }
        return response;
    },
    function (error) {
        //let msg = ""
        //error.response.data.map((arr, index) => msg += `${arr.info}\n`)
        //error.response.data.map((arr, index) => message.error( `${arr.info}\n`))
        console.log("error Response", error.response)
        message.error(error.response.data[1].info)
        return Promise.reject(error);
    });


//이미지 삭제
export const getRemoveImage = (fileList) => {
    if (fileList && fileList.length > 0) {
        if (fileList[0].response) {
            const file = []
            for (let i in fileList) {
                const temp = {
                    uid: fileList[i].uid,
                    name: fileList[i].response.name,
                    status: fileList[i].response.status,
                    url: fileList[i].response.url,
                    thumbUrl: fileList[i].thumbUrl,
                }
                file.push(temp)
            }
            console.log('api: getRemoveImage', { file }, fileList, { idx: fileList })
            return axios.delete(`/scan`, { data: file })
        }
        else {
            return axios.delete(`/scan`, { data: fileList })
        }
    }
}

//계약 등록
export const postConts = (formData) => {
    console.log("formData postConts", formData)
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
        headContId: formData.HeadContId,
        contNm: formData.contNm,

    }
    return axios.post('/cont/create', data);
}


//계약 수정
export const postUpdateConts = (formData) => {
    console.log("postUpdateConts: formData ", formData)
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
        headContId: formData.headContId,
        contNm: formData.contNm,
    }
    return axios.put(`/cont/${formData.contId}`, data);
}
export const getMTNC = () =>
    axios.get('/cont/mtnc');

//계약 테이블 - 리스트 삭제
export const getDeleteConts = (selectedRowKeys) => {
    console.log("selected", selectedRowKeys)

    return axios.delete(`/cont`, { data: { idx: selectedRowKeys } })
}

export const getContLcnsNumber = (prdtNm,installDt) =>
    axios.get('/lcns/generate',{data:{prdtNm:prdtNm,installDt:installDt}})

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

export const getCustListMeet = () => {
    return axios.get('/cust/aclist');
}

// 계약고객 리스트
export const getContCustList = () => {
    return axios.get('/cust/cont');
}

// 가망고객 리스트
export const getPresaleCustomerList = () => {
    return axios.get('/cust/presale')
}

export const postManager = (formData) => {
    const data = {
        empNm: formData.empNm,
        email: formData.email,
        telNo: formData.telNo,
        empTpCd: formData.empTpCd,
    }
    return axios.post('/b2en/create', data);
}

export const updateManager = (formData) => {
    const data = {
        empNm: formData.empNm,
        email: formData.email,
        telNo: formData.telNo,
        empTpCd: formData.empTpCd,
    }
    return axios.put(`/b2en/${formData.empId}`, data);
}
export const getManagerCD = () =>
    axios.get('/cmmncd/emp_tp_cd')

export const postProduct = (formData) => {
    const data = {
        prdtNm: formData.prdtNm,
        prdtAmt: formData.prdtAmt,
        prdtDesc: formData.prdtDesc,
        prdtTpCd: formData.prdtTpCd
    }
    return axios.post('/prdt/create', data);
}

export const updateProduct = (formData) => {
    const data = {
        prdtId: formData.prdtId,
        prdtNm: formData.prdtNm,
        prdtAmt: formData.prdtAmt,
        prdtDesc: formData.prdtDesc,
        prdtTpCd: formData.prdtTpCd
    }
    return axios.put(`/prdt/${formData.prdtId}`, data);
}
export const getProductCD = () =>
    axios.get('/cmmncd/prdt_tp_cd')

//모계약 리스트
export const getheadConts = () =>
    axios.get('/cont/aclist')

//계약
export const getCont = (key) =>
    axios.get(`/cont/${key}`);


export const getHistList = (contId) =>
    axios.get(`cont/hist/${contId}`);

//기관 리스트
export const getOrganization = () =>
    axios.get('/org/aclist');

//계약 리스트
export const getConts = () =>
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


export const deleteManager = (selectedRowKeys) =>
    axios.delete(`/b2en`, { data: { idx: selectedRowKeys } })

// b2en 담당자 리스트
export const getManagerList = () =>
    axios.get('/b2en/showall');

export const getManager = (empNo) =>
    axios.get(`/b2en/${empNo}`)

export const getOrgList = () =>
    axios.get('/org/showall');


export const deleteOrg = (selectedRowKeys) => {
    axios.delete('/org', { data: { idx: selectedRowKeys } })
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
export const deleteMeeting = (selectedRowKeys) =>
    axios.delete(`/meet`, { data: { idx: selectedRowKeys } })

export const getMeetingList = () =>
    axios.get('/meet/showall');

export const getMeeting = (meetId) =>
    axios.get(`/meet/${meetId}`);

export const getMeetingCode = () =>
    axios.get('/cmmncd/meet_tp_cd');

export const postMeeting = (formData) => {
    const data = {
        meetDt: formData.meetDt,
        meetCnt: formData.meetCnt,
        meetStartTime: formData.meetStartTime,
        meetTotTime: formData.meetTotTime,
        meetTpCd: formData.meetTpCd,
        custs: formData.custs,
        emps: formData.emps,
    }
    return axios.post(`/meet/create`, data);
}
export const postUpdateMeeting = (formData) => {

    const data = {
        meetDt: formData.meetDt,
        meetCnt: formData.meetCnt,
        meetStartTime: formData.meetStartTime,
        meetTotTime: formData.meetTotTime,
        meetTpCd: formData.meetTpCd,
        custs: formData.custs,
        emps: formData.emps,
    }
    console.log("postUpdateMeeting data", data)
    return axios.put(`/meet/${formData.meetId}`, data);
}

export const getPossibleCont = (key) =>
    axios.get(`/temp/${key}`);

export const getPossibleConts = () =>
    axios.get('/temp/showall');

export const getPossibleEX = () =>
    axios.get('/temp/expired')

export const getPossibleToEX = () =>
    axios.get('/temp/toexpire')

export const updatePossible = (formData) => {
    const data = {
        lcns: formData.lcns,
        custId: formData.custId,
        empId: formData.empId,
        requestDate: formData.requestDate,
        macAddr: formData.macAddr,
        issueReason: formData.issueReason,
        user: formData.user,
    }
    axios.put(`/temp/${formData.tempVerId}`, data);
}
//임시 계약 등록
export const postPossible = (formData) => {
    console.log("postPossible", formData)
    const data = {
        lcns: formData.lcns,
        custId: formData.custId,
        empId: formData.empId,
        requestDate: formData.requestDate,
        macAddr: formData.macAddr,
        issueReason: formData.issueReason,
        user: formData.user,
    }
    return axios.post('/temp/create', data);
}

export const getTempHistList = (tempVerId) =>
    axios.get(`temp/hist/${tempVerId}`);

