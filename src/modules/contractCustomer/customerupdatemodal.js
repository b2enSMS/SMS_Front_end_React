import {createAction, handleActions} from 'redux-actions';
import * as api from '../../lib/api';

const HANDLE_CANCEL = 'customerupdatemodal/HANDLE_CANCEL';
const CHANGE_INPUT = 'customerupdatemodal/CHANGE_INPUT';

const UPDATE = 'customerupdatemodal/UPDATE';
const UPDATE_SUCCESS = 'customerupdatemodal/UPDATE_SUCCESS';
const UPDATE_FAILURE = 'customerupdatemodal/UPDATE_FAILURE';

const SHOW_MODAL = 'customerupdatemodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'customerupdatemodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'customerupdatemodal/SHOW_MODAL_FAILURE';

export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value}) => ({form, key, value}));

export const getShowUpdateModal = cust => async dispatch => {
    dispatch({ type: SHOW_MODAL });
    try {
        const response = await api.getOrganization();
        const res = await api.getCust(cust);
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                org: response.data,
                cust: res.data,
            }
        })
    } catch(e) {
        console.log("error");
        dispatch({
            type: SHOW_MODAL_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

export const handleChangeInput = (changeData) => dispatch => {
    dispatch({ type: CHANGE_INPUT, payload: changeData });
};

export const getHandleCancel = () => dispatch => {
    dispatch({ type: HANDLE_CANCEL });
};

export const updateCustomer = (custId, formData) => async dispatch => {
    dispatch({type: UPDATE});
    try {
        await api.updateCustomer(custId, formData);
        dispatch({
            type: UPDATE_SUCCESS,
        })
    } catch (e) {
        dispatch({
            type: UPDATE_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

const initialState = {
    updateVisible: false,
    orgList: [],
    custInfo: {},
    updateCustomerModal: {},
};

const customerupdatemodal = handleActions(
    {
        [HANDLE_CANCEL]: state => ({
            ...state,
            updateVisible: false,
        }),
        [SHOW_MODAL]: state => ({
            ...state,
            updateVisible: true,
        }),
        [SHOW_MODAL_SUCCESS]: (state, action) => ({
            ...state,
            orgList: action.payload.org,
            custInfo: action.payload.cust,
        }),
        [SHOW_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [UPDATE]: state => ({
            ...state,
        }),
        [UPDATE_SUCCESS]: (state, action) => ({
            ...state,
            updateVisible: false
        }),
        [UPDATE_FAILURE]: state => ({
            ...state,
        }),
    },
    initialState,
);

export default customerupdatemodal