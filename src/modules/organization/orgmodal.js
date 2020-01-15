import { createAction, handleActions } from 'redux-actions';
import * as api from '../../lib/api';
import produce from "immer";
import { GET_ORG, GET_ORG_SUCCESS, GET_ORG_FAILURE } from './orgtable';

const ORG_INIT = 'orgmodal/ORG_INIT';
const BUTTON_CHANGE = 'orgmodal/BUTTON_CHANGE';

const HANDLE_CANCEL = "orgmodal/HANDLE_CANCEL";
const CHANGE_INPUT = "orgmodal/CHANGE_INPUT";

const UPDATE_ORG = 'orgmodal/UPDATE_ORG';
const UPDATE_ORG_SUCCESS = 'orgmodal/UPDATE_ORG_SUCCESS';
const UPDATE_ORG_FAILURE = 'orgmodal/UPDATE_ORG_FAILURE';

const SHOW_MODAL = 'orgmodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'orgmodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'orgmodal/SHOW_MODAL_FAILURE';

const SHOW_UPDATE_MODAL = 'orgmodal/SHOW_UPDATE_MODAL';
const SHOW_UPDATE_MODAL_SUCCESS = 'orgmodal/SHOW_UPDATE_MODAL_SUCCESS';
const SHOW_UPDATE_MODAL_FAILURE = 'orgmodal/SHOW_UPDATE_MODAL_FAILURE';

const POST_ORG = 'orgmodal/POST_ORG';
const POST_ORG_SUCCESS = 'orgmodal/POST_ORG_SUCCESS';
const POST_ORG_FAILURE = 'orgmodal/POST_ORG_FAILURE';

export const getButtonChange = createAction(BUTTON_CHANGE);
export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initialForm = createAction(ORG_INIT, form => form);

export const getShowModal = () => dispatch => {
    dispatch({ type: SHOW_MODAL });
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
    } catch (e) {
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
    dispatch({ type: UPDATE_ORG });
    try {
        await api.updateOrg(formData);
        dispatch({
            type: UPDATE_ORG_SUCCESS
        });
        dispatch({
            type: ORG_INIT,
            payload: "orgForm"
        });
        dispatch({
            type: GET_ORG
        });
        try {
            const response = await api.getOrgList();
            dispatch({
                type: GET_ORG_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_ORG_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch (e) {
        dispatch({
            type: UPDATE_ORG_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

export const getHandleCancel = () => dispatch => {
    dispatch({ type: HANDLE_CANCEL });
    dispatch({ type: ORG_INIT, payload: "orgForm" });
};

export const handleOk = (formData) => async dispatch => {
    dispatch({ type: POST_ORG });
    try {
        await api.postOrg(formData);
        dispatch({
            type: POST_ORG_SUCCESS
        })
        dispatch({
            type: ORG_INIT,
            payload: "orgForm"
        });
        dispatch({
            type: GET_ORG
        });
        try {
            const response = await api.getOrgList();
            dispatch({
                type: GET_ORG_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_ORG_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch (e) {
        dispatch({
            type: POST_ORG_FAILURE,
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
    visible: false,
    buttonFlag: true,
    confirmLoading: false,
    orgForm: {
        orgNm: '',
        orgAddr: '',
    },
};

const orgmodal = handleActions(
    {
        [BUTTON_CHANGE]: state => ({
            ...state,
            buttonFlag: false
        }),
        [SHOW_MODAL]: state => ({
            ...state,
            visible: true,
            confirmLoading: true,
        }),
        [SHOW_MODAL_SUCCESS]: state => ({
            ...state,
            confirmLoading: false,
        }),
        [SHOW_MODAL_FAILURE]: state => ({
            ...state,
            confirmLoading: false,
        }),
        [SHOW_UPDATE_MODAL]: state => ({
            ...state,
            visible: true,
            confirmLoading:true,
        }),
        [SHOW_UPDATE_MODAL_SUCCESS]: (state, { payload: { form } }) =>
            produce(state, draft => {
                draft["orgForm"] = form
                draft['confirmLoading'] = false
            }),
        [SHOW_UPDATE_MODAL_FAILURE]: state => ({
            ...state,
            confirmLoading: false,
        }),

        [HANDLE_CANCEL]: state => ({
            ...state,
            visible: false,
            buttonFlag: true,
        }),
        [CHANGE_INPUT]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                draft[form][key] = value
            }),
        [ORG_INIT]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
            visible: false,
            buttonFlag: true,
            confirmLoading:false,
        }),
        [POST_ORG]: state => ({
            ...state,
            confirmLoading:true,
        }),
        [POST_ORG_SUCCESS]: state => ({
            ...state,
        }),
        [POST_ORG_FAILURE]: state => ({
            ...state,
            confirmLoading: false,
        }),
        [UPDATE_ORG]: state => ({
            ...state,
            confirmLoading: true,
        }),
        [UPDATE_ORG_SUCCESS]: state => ({
            ...state,
            confirmLoading: false,
        }),
        [UPDATE_ORG_FAILURE]: state => ({
            ...state,
            confirmLoading: false,
        }),
    },
    initialState,
);

export default orgmodal