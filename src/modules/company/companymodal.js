import {createAction, handleActions} from 'redux-actions';
import * as api from '../../lib/api';
import produce from "immer";
import { GET_COMPANY, GET_COMPANY_SUCCESS, GET_COMPANY_FAILURE } from './companytable';

const COMPANY_INIT = 'companymodal/COMPANY_INIT';
const BUTTON_CHANGE = 'companymodal/BUTTON_CHANGE';

const HANDLE_CANCEL = "companymodal/HANDLE_CANCEL";
const CHANGE_INPUT = "companymodal/CHANGE_INPUT";

const UPDATE_COMPANY = 'companymodal/UPDATE_COMPANY';
const UPDATE_COMPANY_SUCCESS = 'companymodal/UPDATE_COMPANY_SUCCESS';
const UPDATE_COMPANY_FAILURE = 'companymodal/UPDATE_COMPANY_FAILURE';

const SHOW_MODAL = 'companymodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'companymodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'companymodal/SHOW_MODAL_FAILURE';

const SHOW_UPDATE_MODAL = 'companymodal/SHOW_UPDATE_MODAL';
const SHOW_UPDATE_MODAL_SUCCESS = 'companymodal/SHOW_UPDATE_MODAL_SUCCESS';
const SHOW_UPDATE_MODAL_FAILURE = 'companymodal/SHOW_UPDATE_MODAL_FAILURE';

const POST_COMPANY = 'companymodal/POST_COMPANY';
const POST_COMPANY_SUCCESS = 'companymodal/POST_COMPANY_SUCCESS';
const POST_COMPANY_FAILURE = 'companymodal/POST_COMPANY_FAILURE';

export const getButtonChange = createAction(BUTTON_CHANGE);
export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initialForm = createAction(COMPANY_INIT, form => form);

export const getShowModal = () => dispatch => {
    dispatch({ type: SHOW_MODAL});
    try {
        dispatch({
            type: SHOW_MODAL_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type: SHOW_MODAL_FAILURE,
        })
    }
}

export const getShowUpdateModal = org => async dispatch => {
    dispatch({ type: SHOW_UPDATE_MODAL });
    try {
        const res = await api.getOrg(org);
        dispatch({
            type: SHOW_UPDATE_MODAL_SUCCESS,
            payload: {
                form: res.data,
            }
        })
    } catch(e) {
        console.log("error");
        dispatch({
            type: SHOW_UPDATE_MODAL_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

export const handleUpdateOk = (formData) => async dispatch => {
    dispatch({ type: UPDATE_COMPANY });
    try {
        await api.updateOrg(formData);
        dispatch({
            type: UPDATE_COMPANY_SUCCESS
        });
        dispatch({
            type: COMPANY_INIT,
            payload: "companyModal"
        });
        dispatch({
            type: GET_COMPANY
        });
        try {
            const response = await api.getOrgList();
            dispatch({
                type: GET_COMPANY_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_COMPANY_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch (e) {
        dispatch({
            type: UPDATE_COMPANY_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

export const getHandleCancel = () => dispatch => {
    dispatch({ type: HANDLE_CANCEL });
    dispatch({ type: COMPANY_INIT, payload: "companyModal" });
};

export const handleOk = (formData) => async dispatch => {
    dispatch({ type: POST_COMPANY });
    try {
        await api.postOrg(formData);
        dispatch({
            type: POST_COMPANY_SUCCESS
        })
        dispatch({
            type: COMPANY_INIT,
            payload: "companyModal"
        });
        dispatch({
            type: GET_COMPANY
        });
        try {
            const response = await api.getOrgList();
            dispatch({
                type: GET_COMPANY_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_COMPANY_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch(e) {
        dispatch({
            type: POST_COMPANY_FAILURE,
            payload: e,
            error: true,
        });
        throw e;
    }
}

export const handleChangeInput = (changeData) => dispatch => {
    dispatch({ type: CHANGE_INPUT, payload: changeData });
};

const initialState = {
    updateVisible: false,
    buttonFlag: true,
    companyModal : {
        orgNm: '',
        orgAddr: '',
    },
};

const companymodal = handleActions(
    {
        [BUTTON_CHANGE]: state => ({
            ...state,
            buttonFlag : false
        }),
        [SHOW_MODAL]: state => ({
            ...state,
            updateVisible: true,
        }),
        [SHOW_MODAL_SUCCESS]: state => ({
            ...state,
        }),
        [SHOW_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [SHOW_UPDATE_MODAL]: state => ({
            ...state,
            updateVisible: true,
        }),
        [SHOW_UPDATE_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [SHOW_UPDATE_MODAL_SUCCESS]: (state, { payload: {form}}) =>
            produce(state, draft => {
                draft["companyModal"] = form
            }),
        [HANDLE_CANCEL]: state => ({
            ...state,
            updateVisible: false,
            buttonFlag: true,
        }),
        [CHANGE_INPUT]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                draft[form][key] = value
            }),
        [COMPANY_INIT]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [POST_COMPANY]: state => ({
            ...state,
        }),
        [POST_COMPANY_SUCCESS]: state => ({
            ...state,
            updateVisible: false,
            buttonFlag: true,
        }),
        [POST_COMPANY_FAILURE]: state => ({
            ...state,
            updateVisible: false,
        }),
        [UPDATE_COMPANY]: state => ({
            ...state,
            updateVisible: true,
        }),
        [UPDATE_COMPANY_SUCCESS]: state => ({
            ...state,
            updateVisible: false,
            buttonFlag: true,
        }),
        [UPDATE_COMPANY_FAILURE]: state => ({
            ...state,
            updateVisible: false,
        }),
    },
    initialState,
);

export default companymodal