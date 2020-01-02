import { handleActions, createAction } from 'redux-actions';
import * as api from '../../lib/api';
import produce from 'immer';
import { GET_CONTRACT, GET_CONTRACT_SUCCESS, GET_CONTRACT_FAILURE } from './possibletable'

const CHANGE_INPUT = 'possiblemodal/CHANGE_INPUT';
const HANDLE_CANCEL = 'possiblemodal/HANDLE_CANCLE';

const SHOW_MODAL = 'possiblemodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'possiblemodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'possiblemodal/SHOW_MODAL_FAILURE';

const POST_CONTRACT = 'possiblemodal/POST_CONTRACT';
const POST_CONTRACT_SUCCESS = 'possiblemodal/POST_CONTRACT_SUCCESS';
const POST_CONTRACT_FAILURE = 'possiblemodal/POST_CONTRACT_FAILURE';

const UPDATE_CONTRACT = 'possiblemodal/UPDATE_CONTRACT'
const UPDATE_CONTRACT_SUCCESS = 'possiblemodal/UPDATE_CONTRACT_SUCCESS'
const UPDATE_CONTRACT_FAILURE = 'possiblemodal/UPDATE_CONTRACT_FAILURE'

const INPUT_LICENSE = 'possiblemodal/INPUT_LICENSE';
const UPDATE_LICENSE = 'possiblemodal/UPDATE_LICENSE'

const REMOVE_LICENSE = 'possiblemodal/REMOVE_LICENSE';
const INITIALIZE_FORM = 'possiblemodal/INITIALIZE_FORM'

const BUTTON_CHANGE = 'possiblemodal/BUTTON_CHANGE'

export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const getButtonChange = createAction(BUTTON_CHANGE);

export const gethandleUpdate = (formData) => async dispatch => {

    dispatch({ type: POST_CONTRACT });
    try {
        await api.updatePossible(formData);
        dispatch({
            type: POST_CONTRACT_SUCCESS,
        });
        dispatch({ type: INITIALIZE_FORM, payload: "possibleForm" });

        dispatch({ type: GET_CONTRACT });
        try {
            const response = await api.getTempContracts();
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
        const response = await api.getTempContract(key)
        const responseML = await api.getB2enManager();
        const responseOML = await api.getorgML();

        dispatch({
            type: UPDATE_CONTRACT_SUCCESS,
            payload: {
                form: response.data,
                b2enML: responseML.data,
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


export const inputLicense = (licenseForm) => dispatch => {
    dispatch({
        type: INPUT_LICENSE,
        payload: { licenseForm }
    })
}
export const updateLicense = (licenseForm, keyIndex) => dispatch => {
    dispatch({
        type: UPDATE_LICENSE,
        payload: { licenseForm, keyIndex }
    })
}

// export const getArrayHandleChange = (changeData) => dispatch => {
//     console.log("changeData", changeData)
//     dispatch({ type: ARRAY_INPUT, payload: changeData });
// }

export const getShowModal = () => async dispatch => {
    dispatch({ type: SHOW_MODAL });
    try {
        const responseOML = await api.getorgML();
        const responseML = await api.getB2enManager();
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                b2enML: responseML.data,
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

export const getHandleCancel = () => dispatch => {
    console.log("getHandleCancel")
    dispatch({ type: HANDLE_CANCEL });
    dispatch({ type: INITIALIZE_FORM, payload: "possibleForm" });
}

export const handleChangeInput = (changeData) => dispatch => {
    console.log(changeData)
    dispatch({ type: CHANGE_INPUT, payload: changeData });
}

export const handleOk = (formData) => async dispatch => {

    dispatch({ type: POST_CONTRACT });
    try {
        await api.postPossible(formData);
        dispatch({
            type: POST_CONTRACT_SUCCESS,
        });
        dispatch({ type: INITIALIZE_FORM, payload: "possibleForm" });

        dispatch({ type: GET_CONTRACT });
        try {
            const response = await api.getTempContracts();
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
    possibleForm: {
        requestDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        lcns: [],
        orgNm: "",
        empNm: "",
        custId: "",
        custNm: "",
        macAdrr: "",
        issueReason: "",
    },
    buttonFlag: true,
    b2enML: [],
    custML: [],
}

const possiblemodal = handleActions(
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

        [UPDATE_CONTRACT_SUCCESS]: (state, { payload: { form, b2enML, custML } }) =>
            produce(state, draft => {
                draft["b2enML"] = b2enML
                draft["possibleForm"] = form
                draft["confirmLoading"] = false
                draft["custML"] = custML
            }),

        [UPDATE_CONTRACT_FAILURE]: (state, action) => ({
            ...state,
            confirmLoading: false,
        }),


        [REMOVE_LICENSE]: (state, { payload: idx }) =>
            produce(state, draft => {
                draft["possibleForm"]["lcns"] = state.possibleForm.lcns.filter((license, index) => index !== idx)
            }),

        [INPUT_LICENSE]: (state, action) =>
            produce(state, draft => {
                let lcns = Object.assign({}, action.payload.licenseForm);
                lcns.fileList = action.payload.fileList;
                draft["possibleForm"]["lcns"] = state.possibleForm.lcns.concat(lcns)
            }),

        [UPDATE_LICENSE]: (state, {payload: {licenseForm,keyIndex}}) =>
            produce(state, draft => {
                let lcns = Object.assign({}, licenseForm);//action.payload.licenseForm);
                //lcns.fileList = fileList;//action.payload.fileList;
                draft["possibleForm"]["lcns"][keyIndex] = lcns;
            }),

        [SHOW_MODAL]: state => ({
            ...state,
            visible: true,
        }),
        [SHOW_MODAL_SUCCESS]: (state, action) => ({
            ...state,
            b2enML: action.payload.b2enML,
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

export default possiblemodal;