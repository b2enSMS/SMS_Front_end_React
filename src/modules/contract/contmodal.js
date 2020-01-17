import { handleActions, createAction } from 'redux-actions';
import * as api from '../../lib/api';
import produce from 'immer';
import { GET_CONT, GET_CONT_SUCCESS, GET_CONT_FAILURE } from './conttable'
import { INITIALIZE_FORM as licensemodal_INITIALIZE_FORM } from './licensemodal'

const CHANGE_INPUT = 'contmodal/CHANGE_INPUT';
const HANDLE_CANCEL = 'contmodal/HANDLE_CANCLE';

const SHOW_MODAL = 'contmodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'contmodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'contmodal/SHOW_MODAL_FAILURE';

const POST_CONT = 'contmodal/POST_CONT';
const POST_CONT_SUCCESS = 'contmodal/POST_CONT_SUCCESS';
const POST_CONT_FAILURE = 'contmodal/POST_CONT_FAILURE';

const UPDATE_CONT = 'contmodal/UPDATE_CONT'
const UPDATE_CONT_SUCCESS = 'contmodal/UPDATE_CONT_SUCCESS'
const UPDATE_CONT_FAILURE = 'contmodal/UPDATE_CONT_FAILURE'

const INPUT_LICENSE = 'contmodal/INPUT_LICENSE';
const UPDATE_LICENSE = 'contmodal/UPDATE_LICENSE'

const REMOVE_LICENSE = 'contmodal/REMOVE_LICENSE';
const INITIALIZE_FORM = 'contmodal/INITIALIZE_FORM'

const BUTTON_CHANGE = 'contmodal/BUTTON_CHANGE'

//export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));


//Form안에 있는 TextField 값 초기화
export const initializeForm = createAction(INITIALIZE_FORM, form => form);

//등록 or 수정 시 버튼 Text 변경 (등록 -> 수정 or 수정 -> 등록)
export const getButtonChange = createAction(BUTTON_CHANGE);

//계약 정보 수정
export const gethandleUpdate = (formData) => async dispatch => {

    dispatch({ type: POST_CONT });
    try {
        await api.postUpdateConts(formData);
        dispatch({
            type: POST_CONT_SUCCESS,
        });
        dispatch({ type: INITIALIZE_FORM, payload: "contForm" });

        dispatch({ type: GET_CONT });
        try {
            const response = await api.getConts();
            dispatch({
                type: GET_CONT_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_CONT_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch (e) {
        dispatch({
            type: POST_CONT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

//라이센스 삭제버튼
export const getLicenseHandleDelete = (idx) => dispacth => {
    dispacth({
        type: REMOVE_LICENSE,
        payload: idx
    });
}

//테이블에서 상세버튼 클릭
export const getUpdateModal = (key) => async dispatch => {
    dispatch({ type: UPDATE_CONT })
    try {
        const response = await api.getCont(key)
        const responseOrg = await api.getOrganization();
        const responseML = await api.getB2enManager();
        const responseCD = await api.getcontCD();
        const reaponseHC = await api.getheadConts();
        const responseOML = await api.getorgML();

        dispatch({
            type: UPDATE_CONT_SUCCESS,
            payload: {
                form: response.data,
                orgList: responseOrg.data,
                managerList: responseML.data,
                contCdList: responseCD.data,
                headContList: reaponseHC.data,
                custList: responseOML.data,
            }
        })
    } catch (e) {
        dispatch({
            type: UPDATE_CONT_FAILURE,
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
                managerList: responseML.data,
                contCdList: responseCD.data,
                headContList: responseHC.data,
                custList: responseOML.data,
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
    dispatch({ type: INITIALIZE_FORM, payload: "contForm" });
}

//TextField 값 관리
export const handleChangeInput = (changeData) => dispatch => {
    dispatch({ type: CHANGE_INPUT, payload: changeData });
}

//등록 버튼 클릭
export const handleOk = (formData) => async dispatch => {

    dispatch({ type: POST_CONT });
    try {
        await api.postConts(formData);
        dispatch({
            type: POST_CONT_SUCCESS,
        });
        dispatch({ type: INITIALIZE_FORM, payload: "contForm" });
        dispatch({ type: licensemodal_INITIALIZE_FORM, payload: 'licenseForm' })
        dispatch({ type: GET_CONT });
        try {
            const response = await api.getConts();
            dispatch({
                type: GET_CONT_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_CONT_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch (e) {
        dispatch({
            type: POST_CONT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};
/*
    visible: 모달 띄우는 flag
    confirmLoading: 모달 로딩 flag
    contForm: 모달안에 들어있는 form
    buttonFlag: 등록 수정 버튼 변경 flag
    orgList: 기관 리스트
    managerList: b2en담당자 리스트
    contCdList: 계약 유형 리스트
    headContList: 모계약 리스트
    custList: 기관 담당자 리스트
*/
const initialState = {
    visible: false,
    confirmLoading: false,
    contForm: {
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
        custId: 0,
        custNm: "",
        contNm: "",
    },
    buttonFlag: true,
    orgList: [],
    managerList: [],
    contCdList: [],
    headContList: [],
    custList: [],
}

const contmodal = handleActions(
    {
        [BUTTON_CHANGE]: state => ({
            ...state,
            buttonFlag: false
        }),

        [UPDATE_CONT]: state => ({
            ...state,
            confirmLoading: true,
            visible: true,
        }),

        [UPDATE_CONT_SUCCESS]: (state, { payload: { form, orgList, managerList, contCdList, headContList, custList } }) =>
            produce(state, draft => {
                draft["orgList"] = orgList
                draft["managerList"] = managerList
                draft["contCdList"] = contCdList
                draft["contForm"] = form
                draft["confirmLoading"] = false
                draft["headContList"] = headContList
                draft["custList"] = custList
            }),

        [UPDATE_CONT_FAILURE]: (state, action) => ({
            ...state,
            confirmLoading: false,
        }),


        [REMOVE_LICENSE]: (state, { payload: idx }) =>
            produce(state, draft => {
                draft["contForm"]["lcns"] = state.contForm.lcns.filter((license, index) => index !== idx)
            }),

        [INPUT_LICENSE]: (state, action) =>
            produce(state, draft => {
                let lcns = Object.assign({}, action.payload.licenseForm);
                lcns.fileList = action.payload.fileList;
                draft["contForm"]["lcns"] = state.contForm.lcns.concat(lcns)
            }),

        [UPDATE_LICENSE]: (state, { payload: { licenseForm, fileList, keyIndex } }) =>
            produce(state, draft => {
                let lcns = Object.assign({}, licenseForm);//action.payload.licenseForm);
                lcns.fileList = fileList;//action.payload.fileList;
                draft["contForm"]["lcns"][keyIndex] = lcns;
            }),

        [SHOW_MODAL]: state => ({
            ...state,
            visible: true,
        }),
        [SHOW_MODAL_SUCCESS]: (state, action) => ({
            ...state,
            orgList: action.payload.org,
            managerList: action.payload.managerList,
            contCdList: action.payload.contCdList,
            headContList: action.payload.headContList,
            custList: action.payload.custList,
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
        [POST_CONT]: state => ({
            ...state,
            confirmLoading: true,
        }),
        [POST_CONT_SUCCESS]: (state, action) => ({
            ...state,
            confirmLoading: false,
            visible: false,
            buttonFlag: true,
        }),
        [POST_CONT_FAILURE]: (state, action) => ({
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

export default contmodal;