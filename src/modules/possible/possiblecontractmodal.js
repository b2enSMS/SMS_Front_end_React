import { handleActions, createAction } from 'redux-actions';
import * as api from '../../lib/api';
import produce from 'immer';
import { GET_POSSIBLE, GET_POSSIBLE_SUCCESS, GET_POSSIBLE_FAILURE } from './possiblecontracttable'

const CHANGE_INPUT = 'possiblecontractmodal/CHANGE_INPUT';
const HANDLE_CANCEL = 'possiblecontractmodal/HANDLE_CANCEL';

const SHOW_MODAL = 'possiblecontractmodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'possiblecontractmodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'possiblecontractmodal/SHOW_MODAL_FAILURE';

const POST_POSSIBLE = 'possiblecontractmodal/POST_POSSIBLE';
const POST_POSSIBLE_SUCCESS = 'possiblecontractmodal/POST_POSSIBLE_SUCCESS';
const POST_POSSIBLE_FAILURE = 'possiblecontractmodal/POST_POSSIBLE_FAILURE';

const UPDATE_POSSIBLE = 'contractmodal/UPDATE_POSSIBLE'
const UPDATE_POSSIBLE_SUCCESS = 'possiblecontractmodal/UPDATE_POSSIBLE_SUCCESS'
const UPDATE_POSSIBLE_FAILURE = 'possiblecontractmodal/UPDATE_POSSIBLE_FAILURE'

const INPUT_LICENSE = 'possiblecontractmodal/INPUT_LICENSE';

const REMOVE_LICENSE = 'possiblecontractmodal/REMOVE_LICENSE';
const INITIALIZE_FORM = 'possiblecontractmodal/INITIALIZE_FORM'

const BUTTON_CHANGE = 'possiblecontractmodal/BUTTON_CHANGE'

export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const getButtonChange = createAction(BUTTON_CHANGE);

export const gethandleUpdate = (formData) => async dispatch => {

    dispatch({ type: POST_POSSIBLE });
    try {
        await api.updatePossible(formData);
        dispatch({
            type: POST_POSSIBLE_SUCCESS,
        });
        dispatch({ type: INITIALIZE_FORM, payload: "possibleContractModal" });

        dispatch({ type: GET_POSSIBLE });
        try {
            const response = await api.getPossibleContractList();
            dispatch({
                type: GET_POSSIBLE_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_POSSIBLE_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch (e) {
        dispatch({
            type: POST_POSSIBLE_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

export const getRemoveLicense = (idx) => dispatch => {
    dispatch({
        type: REMOVE_LICENSE,
        payload: idx
    });
}

export const getUpdateModal = (key) => async dispatch => {
    dispatch({ type: UPDATE_POSSIBLE })
    try {
        const response = await api.getPossibleContract(key)
        console.log("respsonfkserresresresresres", response);
        const responseOrg = await api.getOrganization();
        const responseML = await api.getB2enManager();
        dispatch({
            type: UPDATE_POSSIBLE_SUCCESS,
            payload: {
                form: response.data,
                orgList: responseOrg.data,
                b2enML: responseML.data,
            }
        })
    } catch (e) {
        dispatch({
            type: UPDATE_POSSIBLE_FAILURE,
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
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                org: response.data,
                b2enML: responseML.data,
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
    dispatch({ type: INITIALIZE_FORM, payload: "possibleContractModal" });
}

export const handleChangeInput = (changeData) => dispatch => {
    console.log(changeData)
    dispatch({ type: CHANGE_INPUT, payload: changeData });
}

export const handleOk = (formData) => async dispatch => {

    dispatch({ type: POST_POSSIBLE });
    try {
        await api.postPossible(formData);
        dispatch({
            type: POST_POSSIBLE_SUCCESS,
        });
        dispatch({ type: INITIALIZE_FORM, payload: "possibleContractModal" });

        dispatch({ type: GET_POSSIBLE });
        try {
            const response = await api.getPossibleContractList();
            dispatch({
                type: GET_POSSIBLE_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_POSSIBLE_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch (e) {
        dispatch({
            type: POST_POSSIBLE_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

const initialState = {
    visible: false,
    confirmLoading: false,
    possibleContractModal : {
        lcns: [],
        lcnsNo: '',
        macAddr: '',
        orgNm: '',
        empNm: '',
        custNm: '',
    },
    buttonFlag: true,
    orgList: [],
    b2enML: [],

}

const possiblecontractmodal = handleActions(
    {
        [BUTTON_CHANGE]: state => ({
            ...state,
            buttonFlag: false
        }),

        [UPDATE_POSSIBLE]: state => ({
            ...state,
            confirmLoading: true,
            visible: true,
        }),

        [UPDATE_POSSIBLE_SUCCESS]: (state, { payload: { form, orgList, b2enML } }) =>
            produce(state, draft => {
                draft["orgList"] = orgList
                draft["b2enML"] = b2enML
                draft["possibleContractModal"] = form
                draft["confirmLoading"] = false
            }),

        [UPDATE_POSSIBLE_FAILURE]: (state, action) => ({
            ...state,
            confirmLoading: false,
        }),


        [REMOVE_LICENSE]: (state, { payload: idx }) =>
            produce(state, draft => {
                draft["possibleContractModal"]["lcns"] = state.possibleContractModal.lcns.filter((license, index) => index !== idx)
            }),

        [INPUT_LICENSE]: (state, action) =>
            produce(state, draft => {
                draft["possibleContractModal"]["lcns"] = state.possibleContractModal.lcns.concat(action.payload.licenseForm)
            }),

        [SHOW_MODAL]: state => ({
            ...state,
            visible: true,
        }),
        [SHOW_MODAL_SUCCESS]: (state, action) => ({
            ...state,
            orgList: action.payload.org,
            b2enML: action.payload.b2enML,
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
        [POST_POSSIBLE]: state => ({
            ...state,
            confirmLoading: true,
        }),
        [POST_POSSIBLE_SUCCESS]: (state, action) => ({
            ...state,
            confirmLoading: false,
            visible: false
        }),
        [POST_POSSIBLE_FAILURE]: (state, action) => ({
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

export default possiblecontractmodal;