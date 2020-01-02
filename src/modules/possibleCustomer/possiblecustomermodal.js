import {createAction, handleActions} from 'redux-actions';
import * as api from '../../lib/api';
import produce from "immer";
import { GET_POSSIBLE_CUSTOMER, GET_POSSIBLE_CUSTOMER_SUCCESS, GET_POSSIBLE_CUSTOMER_FAILURE } from './possiblecustomertable';

const POSSIBLE_CUSTOMER_INIT = 'possiblecustomermodal/POSSIBLE_CUSTOMER_INIT';
const BUTTON_CHANGE = 'possiblecustomermodal/BUTTON_CHANGE';

const HANDLE_CANCEL = "possiblecustomermodal/HANDLE_CANCEL";
const CHANGE_INPUT = "possiblecustomermodal/CHANGE_INPUT";

const UPDATE_POSSIBLE_CUSTOMER = 'possiblecustomermodal/UPDATE_POSSIBLE_CUSTOMER';
const UPDATE_POSSIBLE_CUSTOMER_SUCCESS = 'possiblecustomermodal/UPDATE_POSSIBLE_CUSTOMER_SUCCESS';
const UPDATE_POSSIBLE_CUSTOMER_FAILURE = 'possiblecustomermodal/UPDATE_POSSIBLE_CUSTOMER_FAILURE';

const SHOW_MODAL = 'possiblecustomermodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'possiblecustomermodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'possiblecustomermodal/SHOW_MODAL_FAILURE';

const SHOW_UPDATE_MODAL = 'possiblecustomermodal/SHOW_UPDATE_MODAL';
const SHOW_UPDATE_MODAL_SUCCESS = 'possiblecustomermodal/SHOW_UPDATE_MODAL_SUCCESS';
const SHOW_UPDATE_MODAL_FAILURE = 'possiblecustomermodal/SHOW_UPDATE_MODAL_FAILURE';

const POST_POSSIBLE_CUSTOMER = 'possiblecustomermodal/POST_POSSIBLE_CUSTOMER';
const POST_POSSIBLE_CUSTOMER_SUCCESS = 'possiblecustomermodal/POST_POSSIBLE_CUSTOMER_SUCCESS';
const POST_POSSIBLE_CUSTOMER_FAILURE = 'possiblecustomermodal/POST_POSSIBLE_CUSTOMER_FAILURE';

export const getButtonChange = createAction(BUTTON_CHANGE);
export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initialForm = createAction(POSSIBLE_CUSTOMER_INIT, form => form);

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
        console.log("getShowUpdateModal",res.data)
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
    dispatch({ type: UPDATE_POSSIBLE_CUSTOMER });
    try {
        await api.updateCustomer(formData);
        dispatch({
            type: UPDATE_POSSIBLE_CUSTOMER_SUCCESS
        });
        dispatch({
            type: POSSIBLE_CUSTOMER_INIT,
            payload: "possibleCustomerModal"
        });
        dispatch({
            type: GET_POSSIBLE_CUSTOMER
        });
        try {
            const response = await api.getPresaleCustomerList();
            dispatch({
                type: GET_POSSIBLE_CUSTOMER_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_POSSIBLE_CUSTOMER_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch (e) {
        dispatch({
            type: UPDATE_POSSIBLE_CUSTOMER_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

export const getHandleCancel = () => dispatch => {
    dispatch({ type: HANDLE_CANCEL });
    dispatch({ type: POSSIBLE_CUSTOMER_INIT, payload: "possibleCustomerModal" });
};

export const handleOk = (formData) => async dispatch => {
    dispatch({ type: POST_POSSIBLE_CUSTOMER });
    try {
        await api.postCustomer(formData);
        dispatch({
            type: POST_POSSIBLE_CUSTOMER_SUCCESS
        })
        dispatch({
            type: POSSIBLE_CUSTOMER_INIT,
            payload: "possibleCustomerModal"
        });
        dispatch({
            type: GET_POSSIBLE_CUSTOMER
        });
        try {
            const response = await api.getPresaleCustomerList();
            dispatch({
                type: GET_POSSIBLE_CUSTOMER_SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: GET_POSSIBLE_CUSTOMER_FAILURE,
                payload: e,
                error: true
            });
            throw e;
        }
    } catch(e) {
        dispatch({
            type: POST_POSSIBLE_CUSTOMER_FAILURE,
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
    possibleCustomerModal : {
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

const possiblecustomermodal = handleActions(
    {
        [BUTTON_CHANGE]: state => ({
            ...state,
            buttonFlag : false
        }),
        [SHOW_MODAL]: state => ({
            ...state,
            updateVisible: true,
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
            updateVisible: true,
        }),
        [SHOW_UPDATE_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [SHOW_UPDATE_MODAL_SUCCESS]: (state, { payload: { form, orgList, custCdList}}) =>
            produce(state, draft => {
                draft["orgList"] = orgList;
                draft["possibleCustomerModal"] = form;
                draft['custCdList'] = custCdList;
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
        [POSSIBLE_CUSTOMER_INIT]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [POST_POSSIBLE_CUSTOMER]: state => ({
            ...state,
            updateVisible: true,
        }),
        [POST_POSSIBLE_CUSTOMER_SUCCESS]: state => ({
            ...state,
            updateVisible: false,
        }),
        [POST_POSSIBLE_CUSTOMER_FAILURE]: state => ({
            ...state,
            updateVisible: false,
        }),
        [UPDATE_POSSIBLE_CUSTOMER]: state => ({
            ...state,
            updateVisible: true,
        }),
        [UPDATE_POSSIBLE_CUSTOMER_SUCCESS]: state => ({
            ...state,
            updateVisible: false,
        }),
        [UPDATE_POSSIBLE_CUSTOMER_FAILURE]: state => ({
            ...state,
            updateVisible: false,
        }),
    },
    initialState,
);

export default possiblecustomermodal