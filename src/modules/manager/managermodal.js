import {createAction, handleActions} from 'redux-actions';
import * as api from '../../lib/api';
import produce from "immer";
import { GET_MANAGER, GET_MANAGER_SUCCESS, GET_MANAGER_FAILURE } from './managertable';

const MANAGER_INIT = 'managermodal/MANAGER_INIT';
const BUTTON_CHANGE = 'managermodal/BUTTON_CHANGE';

const HANDLE_CANCEL = "managermodal/HANDLE_CANCEL";
const CHANGE_INPUT = "managermodal/CHANGE_INPUT";

const UPDATE_MANAGER = 'managermodal/UPDATE_MANAGER';
const UPDATE_MANAGER_SUCCESS = 'managermodal/UPDATE_MANAGER_SUCCESS';
const UPDATE_MANAGER_FAILURE = 'managermodal/UPDATE_MANAGER_FAILURE';

const SHOW_MODAL = 'managermodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'managermodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'managermodal/SHOW_MODAL_FAILURE';

const SHOW_UPDATE_MODAL = 'managermodal/SHOW_UPDATE_MODAL';
const SHOW_UPDATE_MODAL_SUCCESS = 'managermodal/SHOW_UPDATE_MODAL_SUCCESS';
const SHOW_UPDATE_MODAL_FAILURE = 'managermodal/SHOW_UPDATE_MODAL_FAILURE';

const POST_MANAGER = 'managermodal/POST_MANAGER';
const POST_MANAGER_SUCCESS = 'managermodal/POST_PRODUCT_SUCCESS';
const POST_MANAGER_FAILURE = 'managermodal/POST_PRODUCT_FAILURE';

export const getButtonChange = createAction(BUTTON_CHANGE);
export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initialForm = createAction(MANAGER_INIT, form => form);

export const getShowModal = () =>async dispatch => {
    dispatch({ type: SHOW_MODAL});
    try {
        const response = await api.getManagerCD();
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload:{
                empCd:response.data
            },
        })
    } catch (err) {
        dispatch({
            type: SHOW_MODAL_FAILURE,
        })
    }
}

export const getShowUpdateModal = product => async dispatch => {
    dispatch({ type: SHOW_UPDATE_MODAL });
    try {
        const res = await api.getManager(product);
        const response = await api.getManagerCD();
        dispatch({
            type: SHOW_UPDATE_MODAL_SUCCESS,
            payload: {
                form: res.data,
                empCd:response.data,
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
    dispatch({ type: UPDATE_MANAGER });
    try {
        await api.updateManager(formData);
        dispatch({
            type: UPDATE_MANAGER_SUCCESS
        });
        dispatch({
            type: MANAGER_INIT,
            payload: "managerForm"
        });
        dispatch({
            type: GET_MANAGER
        });
        try {
            const response = await api.getManagerList();
            dispatch({
                type: GET_MANAGER_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_MANAGER_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch (e) {
        dispatch({
            type: UPDATE_MANAGER_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

export const getHandleCancel = () => dispatch => {
    dispatch({ type: HANDLE_CANCEL });
    dispatch({ type: MANAGER_INIT, payload: "managerForm" });
};

export const handleOk = (formData) => async dispatch => {
    dispatch({ type: POST_MANAGER });
    try {
        await api.postManager(formData);
        dispatch({
            type: POST_MANAGER_SUCCESS
        })
        dispatch({
            type: MANAGER_INIT,
            payload: "managerForm"
        });
        dispatch({
            type: GET_MANAGER
        });
        try {
            const response = await api.getManagerList();
            dispatch({
                type: GET_MANAGER_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_MANAGER_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch(e) {
        dispatch({
            type: POST_MANAGER_FAILURE,
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
    confirmLoading: false,
    visible: false,
    buttonFlag: true,
    managerForm : {
        empNm: '',
        email: '',
        telNo: '',
        empTpCd: '',
        empTpCdNm: '',
    },
    empCd: [],
};

const managermodal = handleActions(
    {
        [BUTTON_CHANGE]: state => ({
            ...state,
            buttonFlag : false
        }),
        [SHOW_MODAL]: state => ({
            ...state,
            visible: true,
        }),
        [SHOW_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [SHOW_UPDATE_MODAL_SUCCESS]: (state, { payload: {form,empCd}}) =>
            produce(state, draft => {
                draft["managerForm"] = form
                draft["empCd"] = empCd
            }),
        [SHOW_UPDATE_MODAL]: state => ({
            ...state,
            visible: true,
        }),
        [SHOW_UPDATE_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [SHOW_MODAL_SUCCESS]: (state,{payload: {empCd}}) => ({
            ...state,
            visible: true,
            empCd:empCd,
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
        [MANAGER_INIT]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [POST_MANAGER]: state => ({
            ...state,
            confirmLoading: true,
        }),
        [POST_MANAGER_SUCCESS]: state => ({
            ...state,
            visible: false,
            confirmLoading: false,
        }),
        [POST_MANAGER_FAILURE]: state => ({
            ...state,
            confirmLoading: false,
            visible: false,
        }),
        [UPDATE_MANAGER]: state => ({
            ...state,
            confirmLoading: true,
            visible: true,
        }),
        [UPDATE_MANAGER_SUCCESS]: state => ({
            ...state,
            visible: false,
            confirmLoading: false,
            buttonFlag: true,
        }),
        [UPDATE_MANAGER_FAILURE]: state => ({
            ...state,
            confirmLoading: false,
            visible: false,
        }),
    },
    initialState,
);

export default managermodal