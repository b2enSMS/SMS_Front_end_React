import {createAction, handleActions} from 'redux-actions';
import * as api from '../../lib/api';
import produce from "immer";
import { GET_CUSTOMER, GET_CUSTOMER_SUCCESS, GET_CUSTOMER_FAILURE } from './customertable';

const CUSTOMER_INIT = 'customermodal/CUSTOMER_INIT';
const BUTTON_CHANGE = 'customermodal/BUTTON_CHANGE';

const HANDLE_CANCEL = "customermodal/HANDLE_CANCEL";
const CHANGE_INPUT = "customermodal/CHANGE_INPUT";

const UPDATE_CUSTOMER = 'customermodal/UPDATE_CUSTOMER';
const UPDATE_CUSTOMER_SUCCESS = 'customermodal/UPDATE_CUSTOMER_SUCCESS';
const UPDATE_CUSTOMER_FAILURE = 'customermodal/UPDATE_CUSTOMER_FAILURE';

const SHOW_MODAL = 'customermodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'customermodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'customermodal/SHOW_MODAL_FAILURE';

const SHOW_UPDATE_MODAL = 'customermodal/SHOW_UPDATE_MODAL';
const SHOW_UPDATE_MODAL_SUCCESS = 'customermodal/SHOW_UPDATE_MODAL_SUCCESS';
const SHOW_UPDATE_MODAL_FAILURE = 'customermodal/SHOW_UPDATE_MODAL_FAILURE';

const POST_CUSTOMER = 'customermodal/POST_CUSTOMER';
const POST_CUSTOMER_SUCCESS = 'customermodal/POST_CUSTOMER_SUCCESS';
const POST_CUSTOMER_FAILURE = 'customermodal/POST_CUSTOMER_FAILURE';

export const getButtonChange = createAction(BUTTON_CHANGE);
export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initialForm = createAction(CUSTOMER_INIT, form => form);

export const getShowModal = () => async dispatch => {
    dispatch({ type: SHOW_MODAL});
    try {
        const response = await api.getOrganization();
        const resCd = await api.getcustCD();
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                orgList: response.data,
                custCdList: resCd.data,
            }
        })
    } catch (err) {
        dispatch({
            type: SHOW_MODAL_FAILURE,
        })
    }
}

export const getShowUpdateModal = cust => async dispatch => {
    dispatch({ type: SHOW_UPDATE_MODAL });
    try {
        const res = await api.getCust(cust);
        const response = await api.getOrganization();
        const resCd = await api.getcustCD();
        dispatch({
            type: SHOW_UPDATE_MODAL_SUCCESS,
            payload: {
                form: res.data,
                orgList: response.data,
                custCdList: resCd.data,
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
    dispatch({ type: UPDATE_CUSTOMER });
    try {
        await api.updateCustomer(formData);
        dispatch({
            type: UPDATE_CUSTOMER_SUCCESS
        });
        dispatch({
            type: CUSTOMER_INIT,
            payload: "customerForm"
        });
        dispatch({
            type: GET_CUSTOMER
        });
        try {
            const response = await api.getCustList();
            dispatch({
                type: GET_CUSTOMER_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_CUSTOMER_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch (e) {
        dispatch({
            type: UPDATE_CUSTOMER_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

export const getHandleCancel = () => dispatch => {
    dispatch({ type: HANDLE_CANCEL });
    dispatch({ type: CUSTOMER_INIT, payload: "customerForm" });
};

export const handleOk = (formData) => async dispatch => {
    dispatch({ type: POST_CUSTOMER });
    try {
        await api.postCustomer(formData);
        dispatch({
            type: POST_CUSTOMER_SUCCESS
        })
        dispatch({
            type: CUSTOMER_INIT,
            payload: "customerForm"
        });
        dispatch({
            type: GET_CUSTOMER
        });
        try {
            const response = await api.getCustList();
            dispatch({
                type: GET_CUSTOMER_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_CUSTOMER_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch(e) {
        dispatch({
            type: POST_CUSTOMER_FAILURE,
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
    customerForm : {
        orgNm: '',
        custNm: '',
        custRankNm: '',
        email: '',
        telNo: '',
        custTpCd: '',
        custTpCdNm : '',
    },
    orgList: [],
    custCdList: [],
};

const customermodal = handleActions(
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
        [SHOW_MODAL_SUCCESS]: (state, { payload: { orgList, custCdList}}) =>
            produce(state, draft => {
                draft["orgList"] = orgList;
                draft['custCdList'] = custCdList;
            }),
        [SHOW_UPDATE_MODAL]: state => ({
            ...state,
            visible: true,
        }),
        [SHOW_UPDATE_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [SHOW_UPDATE_MODAL_SUCCESS]: (state, { payload: { form, orgList, custCdList}}) =>
            produce(state, draft => {
                draft["orgList"] = orgList;
                draft["customerForm"] = form;
                draft['custCdList'] = custCdList;
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
        [CUSTOMER_INIT]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [POST_CUSTOMER]: state => ({
            ...state,
            confirmLoading: true,
            visible: true,
        }),
        [POST_CUSTOMER_SUCCESS]: state => ({
            ...state,
            visible: false,
            confirmLoading: false,
        }),
        [POST_CUSTOMER_FAILURE]: state => ({
            ...state,
            confirmLoading: false,
        }),
        [UPDATE_CUSTOMER]: state => ({
            ...state,
            confirmLoading: true,
            visible: true,
        }),
        [UPDATE_CUSTOMER_SUCCESS]: state => ({
            ...state,
            confirmLoading: false,
            visible: false,
            buttonFlag: true,
        }),
        [UPDATE_CUSTOMER_FAILURE]: state => ({
            ...state,
            confirmLoading: false,
        }),
    },
    initialState,
);

export default customermodal
