import { handleActions, createAction } from 'redux-actions';
import * as api from '../../lib/api';
import produce from 'immer';
import { GET_CONTRACT, GET_CONTRACT_SUCCESS, GET_CONTRACT_FAILURE } from './contracttable'
import {INITIALIZE_FORM as licensemodal_INITIALIZE_FORM} from './licensemodal'
import { message } from 'antd';

const CHANGE_INPUT = 'contractmodal/CHANGE_INPUT';
const HANDLE_CANCEL = 'contractmodal/HANDLE_CANCLE';

const SHOW_MODAL = 'contractmodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'contractmodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'contractmodal/SHOW_MODAL_FAILURE';

const POST_CONTRACT = 'contractmodal/POST_CONTRACT';
const POST_CONTRACT_SUCCESS = 'contractmodal/POST_CONTRACT_SUCCESS';
const POST_CONTRACT_FAILURE = 'contractmodal/POST_CONTRACT_FAILURE';

const UPDATE_CONTRACT = 'contractmodal/UPDATE_CONTRACT'
const UPDATE_CONTRACT_SUCCESS = 'contractmodal/UPDATE_CONTRACT_SUCCESS'
const UPDATE_CONTRACT_FAILURE = 'contractmodal/UPDATE_CONTRACT_FAILURE'

const INPUT_LICENSE = 'contractmodal/INPUT_LICENSE';
const UPDATE_LICENSE = 'contractmodal/UPDATE_LICENSE'

const REMOVE_LICENSE = 'contractmodal/REMOVE_LICENSE';
const INITIALIZE_FORM = 'contractmodal/INITIALIZE_FORM'

const BUTTON_CHANGE = 'contractmodal/BUTTON_CHANGE'


//export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));

//Form안에 있는 TextField 값 초기화
export const initializeForm = createAction(INITIALIZE_FORM, form => form);

//등록 or 수정 시 버튼 Text 변경 (등록 -> 수정 or 수정 -> 등록)
export const getButtonChange = createAction(BUTTON_CHANGE);

//계약 정보 수정
export const gethandleUpdate = (formData) => async dispatch => {

    dispatch({ type: POST_CONTRACT });
    try {
        await api.postUpdateContracts(formData);
        message.success('업데이트 성공!!');
        dispatch({
            type: POST_CONTRACT_SUCCESS,
        });
        dispatch({ type: INITIALIZE_FORM, payload: "contractModal" });

        dispatch({ type: GET_CONTRACT });
        try {
            const response = await api.getContracts();
            dispatch({
                type: GET_CONTRACT_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_CONTRACT_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch (e) {
        dispatch({
            type: POST_CONTRACT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

//라이센스 삭제버튼
export const getRemoveLicense = (idx) => dispacth => {
    dispacth({
        type: REMOVE_LICENSE,
        payload: idx
    });
}

//테이블에서 상세버튼 클릭
export const getUpdateModal = (key) => async dispatch => {
    dispatch({ type: UPDATE_CONTRACT })
    try {
        const response = await api.getContract(key)
        const responseOrg = await api.getOrganization();
        const responseML = await api.getB2enManager();
        const responseCD = await api.getcontCD();
        const reaponseHC = await api.getheadConts();
        const responseOML = await api.getorgML();

        dispatch({
            type: UPDATE_CONTRACT_SUCCESS,
            payload: {
                form: response.data,
                orgList: responseOrg.data,
                b2enML: responseML.data,
                contCdList: responseCD.data,
                headCont: reaponseHC.data,
                custML: responseOML.data,
            }
        })
    } catch (e) {
        dispatch({
            type: UPDATE_CONTRACT_FAILURE,
            payload: e,
            error: true
        });
        throw (e);
    }
}

//라이센스 추가
export const inputLicense = (licenseForm, fileList) => dispatch => {
    dispatch({
        type: INPUT_LICENSE,
        payload: { licenseForm, fileList }
    })
}
//라이센스 수정
export const updateLicense = (licenseForm, fileList, keyIndex) => dispatch => {
    dispatch({
        type: UPDATE_LICENSE,
        payload: { licenseForm, fileList, keyIndex }
    })
}

// export const getArrayHandleChange = (changeData) => dispatch => {
//     console.log("changeData", changeData)
//     dispatch({ type: ARRAY_INPUT, payload: changeData });
// }

//모달 띄우기
export const getShowModal = () => async dispatch => {
    dispatch({ type: SHOW_MODAL });
    try {
        const response = await api.getOrganization();
        const responseOML = await api.getorgML();
        const responseML = await api.getB2enManager();
        const responseCD = await api.getcontCD();
        const responseHC = await api.getheadConts();
        console.log("reaponseHC", responseHC.data)
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                org: response.data,
                b2enML: responseML.data,
                contCdList: responseCD.data,
                headCont: responseHC.data,
                custML: responseOML.data,
            }
        });
    } catch (e) {
        dispatch({
            type: SHOW_MODAL_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}
//모달 취소 버튼 클릭
export const getHandleCancel = () => dispatch => {
    dispatch({ type: HANDLE_CANCEL });
    dispatch({ type: INITIALIZE_FORM, payload: "contractModal" });
}

//TextField 값 관리
export const handleChangeInput = (changeData) => dispatch => {
    dispatch({ type: CHANGE_INPUT, payload: changeData });
}

//등록 버튼 클릭
export const handleOk = (formData) => async dispatch => {

    dispatch({ type: POST_CONTRACT });
    try {
        await api.postContracts(formData);
        message.success('등록 성공!!');
        dispatch({
            type: POST_CONTRACT_SUCCESS,
        });
        dispatch({ type: INITIALIZE_FORM, payload: "contractModal" });
        dispatch({type: licensemodal_INITIALIZE_FORM,payload: 'licenseForm'})
        dispatch({ type: GET_CONTRACT });
        try {
            const response = await api.getContracts();
            dispatch({
                type: GET_CONTRACT_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_CONTRACT_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch (e) {
        dispatch({
            type: POST_CONTRACT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};
/*
    visible: 모달 띄우는 flag
    confirmLoading: 모달 로딩 flag
    contractModal: 모달안에 들어있는 form
    buttonFlag: 등록 수정 버튼 변경 flag
    orgList: 기관 리스트
    b2enML: b2en담당자 리스트
    contCdList: 계약 유형 리스트
    headCont: 모계약 리스트
    custML: 기관 담당자 리스트
*/
const initialState = {
    visible: false,
    confirmLoading: false,
    contractModal: {
        contDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        installDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        checkDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        mtncStartDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        mtncEndDt: (new Date().getFullYear() + 1) + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        lcns: [],
        orgNm: "",
        empNm: "",
        cmmnDetailCdNm: "",
        contTpCd: "",
        contTpNm: "",
        contReportNo: "",
        headContId: "",
        headContNm: "",
        custId: "",
        custNm: "",
        contNm: "",
    },
    buttonFlag: true,
    orgList: [],
    b2enML: [],
    contCdList: [],
    headCont: [],
    custML: [],
}

const contractmodal = handleActions(
    {
        [BUTTON_CHANGE]: state => ({
            ...state,
            buttonFlag: false
        }),

        [UPDATE_CONTRACT]: state => ({
            ...state,
            confirmLoading: true,
            visible: true,
        }),

        [UPDATE_CONTRACT_SUCCESS]: (state, { payload: { form, orgList, b2enML, contCdList, headCont, custML } }) =>
            produce(state, draft => {
                draft["orgList"] = orgList
                draft["b2enML"] = b2enML
                draft["contCdList"] = contCdList
                draft["contractModal"] = form
                draft["confirmLoading"] = false
                draft["headCont"] = headCont
                draft["custML"] = custML
            }),

        [UPDATE_CONTRACT_FAILURE]: (state, action) => ({
            ...state,
            confirmLoading: false,
        }),


        [REMOVE_LICENSE]: (state, { payload: idx }) =>
            produce(state, draft => {
                draft["contractModal"]["lcns"] = state.contractModal.lcns.filter((license, index) => index !== idx)
            }),

        [INPUT_LICENSE]: (state, action) =>
            produce(state, draft => {
                let lcns = Object.assign({}, action.payload.licenseForm);
                lcns.fileList = action.payload.fileList;
                draft["contractModal"]["lcns"] = state.contractModal.lcns.concat(lcns)
            }),

        [UPDATE_LICENSE]: (state, {payload: {licenseForm,fileList,keyIndex}}) =>
            produce(state, draft => {
                let lcns = Object.assign({}, licenseForm);//action.payload.licenseForm);
                lcns.fileList = fileList;//action.payload.fileList;
                draft["contractModal"]["lcns"][keyIndex] = lcns;
            }),

        [SHOW_MODAL]: state => ({
            ...state,
            visible: true,
        }),
        [SHOW_MODAL_SUCCESS]: (state, action) => ({
            ...state,
            orgList: action.payload.org,
            b2enML: action.payload.b2enML,
            contCdList: action.payload.contCdList,
            headCont: action.payload.headCont,
            custML: action.payload.custML,
            licenses: [],
        }),

        [SHOW_MODAL_FAILURE]: (state) => ({
            ...state,
        }),

        [HANDLE_CANCEL]: state => ({
            ...state,
            visible: false,
            licenses: [],
            buttonFlag: true,
        }),

        [CHANGE_INPUT]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                draft[form][key] = value
            }),
        [POST_CONTRACT]: state => ({
            ...state,
            confirmLoading: true,
        }),
        [POST_CONTRACT_SUCCESS]: (state, action) => ({
            ...state,
            confirmLoading: false,
            visible: false,
            buttonFlag: true,
        }),
        [POST_CONTRACT_FAILURE]: (state, action) => ({
            ...state,
            confirmLoading: false,
        }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        })
    },
    initialState,
);

export default contractmodal;