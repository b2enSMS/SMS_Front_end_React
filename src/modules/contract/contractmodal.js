import { handleActions, createAction } from 'redux-actions';
import * as api from '../../lib/api';
import produce from 'immer';
import { GET_CONTRACT, GET_CONTRACT_SUCCESS, GET_CONTRACT_FAILURE } from './contracttable'

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

const REMOVE_LICENSE = 'contractmodal/REMOVE_LICENSE';
const INITIALIZE_FORM = 'contractmodal/INITIALIZE_FORM'

const BUTTON_CHANGE = 'contractmodal/BUTTON_CHANGE'
const IMAGE_CHANGE = 'contractmodal/IMAGE_CHANGE'
const IMAGE_CANCEL = 'contractmodal/IMAGE_CANCEL'

const IMAGE_PREVIEW = 'contractmodal/IMAGE_PREVIEW'
const IMAGE_PREVIEW_SUCCESS = 'contractmodal/IMAGE_PREVIEW_SUCCESS'
const IMAGE_PREVIEW_FAILURE = 'contractmodal/IMAGE_PREVIEW_FAILURE'

export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const getButtonChange = createAction(BUTTON_CHANGE);
export const gethandleImageChange = createAction(IMAGE_CHANGE, ({fileList}) => ({fileList}))
export const gethandleImageCancel = createAction(IMAGE_CANCEL)

export const gethandlePreview = (file) => async dispatch => {
    console.log("gethandlePreview", file)
    dispatch({ type: IMAGE_PREVIEW });
    try {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        dispatch({
            type: IMAGE_PREVIEW_SUCCESS,
            payload: file
        });
    } catch (e) {
        dispatch({
            type: IMAGE_PREVIEW_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }

}
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        console.log("file",file)
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

export const gethandleUpdate = (formData) => async dispatch => {

    dispatch({ type: POST_CONTRACT });
    try {
        await api.postUpdateContracts(formData);
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

export const getRemoveLicense = (idx) => dispacth => {
    dispacth({
        type: REMOVE_LICENSE,
        payload: idx
    });
}

export const getUpdateModal = (key) => async dispatch => {
    dispatch({ type: UPDATE_CONTRACT })
    try {
        const response = await api.getContract(key)
        const responseOrg = await api.getOrganization();
        const responseML = await api.getB2enManager();
        const responseCD = await api.getcontCD();
        dispatch({
            type: UPDATE_CONTRACT_SUCCESS,
            payload: {
                form: response.data,
                orgList: responseOrg.data,
                b2enML: responseML.data,
                contCdList: responseCD.data
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


export const inputLicense = (licenseForm) => dispatch => {
    dispatch({
        type: INPUT_LICENSE,
        payload: { licenseForm }
    })
}

// export const getArrayHandleChange = (changeData) => dispatch => {
//     console.log("changeData", changeData)
//     dispatch({ type: ARRAY_INPUT, payload: changeData });
// }

export const getShowModal = () => async dispatch => {
    dispatch({ type: SHOW_MODAL });
    try {
        const response = await api.getOrganization();
        const responseML = await api.getB2enManager();
        const responseCD = await api.getcontCD();
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                org: response.data,
                b2enML: responseML.data,
                contCdList: responseCD.data
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

export const getHandleCancel = () => dispatch => {
    console.log("getHandleCancel")
    dispatch({ type: HANDLE_CANCEL });
    dispatch({ type: INITIALIZE_FORM, payload: "contractModal" });
}

export const handleChangeInput = (changeData) => dispatch => {
    console.log(changeData)
    dispatch({ type: CHANGE_INPUT, payload: changeData });
}

export const handleOk = (formData) => async dispatch => {

    dispatch({ type: POST_CONTRACT });
    try {
        console.log("contractrconkafkej", formData.contTpCd)
        await api.postContracts(formData);
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
        fileList: [],
    },
    buttonFlag: true,
    orgList: [],
    b2enML: [],
    contCdList: [],

    previewVisible: false,
    previewImage: '',

}

const contractmodal = handleActions(
    {
        [IMAGE_PREVIEW]: state => ({
            ...state,
        }),

        [IMAGE_PREVIEW_SUCCESS]: (state, { payload: { file } }) => ({
            ...state,
            previewImage: file.url || file.preview,
            previewVisible: true,
        }),
        [IMAGE_PREVIEW_FAILURE]: state => ({
            ...state,
        }),

        [IMAGE_CANCEL]: state => ({
            ...state,
            previewVisible: false,
        }),

        [IMAGE_CHANGE]: (state, { payload: {fileList} }) =>
            produce(state, draft => {
                console.log("moduleFileList",fileList)
                draft["contractModal"]["fileList"] = fileList;
            }),

        [BUTTON_CHANGE]: state => ({
            ...state,
            buttonFlag: false
        }),

        [UPDATE_CONTRACT]: state => ({
            ...state,
            confirmLoading: true,
            visible: true,
        }),

        [UPDATE_CONTRACT_SUCCESS]: (state, { payload: { form, orgList, b2enML, contCdList } }) =>
            produce(state, draft => {
                draft["orgList"] = orgList
                draft["b2enML"] = b2enML
                draft["contCdList"] = contCdList
                draft["contractModal"] = form
                draft["confirmLoading"] = false
            }),

        [UPDATE_CONTRACT_FAILURE]: (state, action) => ({
            ...state,
            confirmLoading: false,
        }),


        [REMOVE_LICENSE]: (state, { payload: idx }) => ({
            ...state,
            contractModal: {
                lcns: state.contractModal.lcns.filter((license, index) => index !== idx),
            }
        }),

        [INPUT_LICENSE]: (state, action) =>
            produce(state, draft => {
                draft["contractModal"]["lcns"] = state.contractModal.lcns.concat(action.payload.licenseForm)
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
            visible: false
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