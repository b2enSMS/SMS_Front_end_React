import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';

const GET_CUSTOMER = 'contractcustomer/GET_CUSTOMER';
const GET_CUSTOMER_SUCCESS = 'contractcustomer/GET_CUSTOMER_SUCCESS';
const GET_CUSTOMER_FAILURE = 'contractcustomer/GET_CUSTOMER_FAILURE';

const DELETE_CUSTOMER = 'contractcustomer/DELETE_CUSTOMER';
const DELETE_CUSTOMER_SUCCESS = 'contractcustomer/DELETE_CUSTOMER_SUCCESS';
const DELETE_CUSTOMER_FAILURE = 'contractcustomer/DELETE_CUSTOMER_FAILURE';

export const getCustomerList = () => async dispatch => {
    dispatch({ type: GET_CUSTOMER });
    try {
        const response = await api.getManagers();
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
};

export const deleteCustomer = selectedRowKeys => async dispatch => {
    dispatch({type: DELETE_CUSTOMER});
    try {
        await api.deleteCustomer(selectedRowKeys);
        dispatch({
            type: DELETE_CUSTOMER_SUCCESS,
        })
    } catch (e) {
        dispatch({
            type: DELETE_CUSTOMER_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

const initialState = {
    visible: false,
    customerList: null,
    loadingTable: false
}

const contractcustomer = handleActions(
    {

        [DELETE_CUSTOMER]: state =>({
            ...state,
            loadingTable:true
        }),

        [DELETE_CUSTOMER_SUCCESS]: state =>({
            ...state,
            loadingTable: false,
        }),

        [DELETE_CUSTOMER_FAILURE]: state =>({
            ...state,
            loadingTable: false,
        }),

        [GET_CUSTOMER]: state => ({
            ...state,
            loadingTable: true
        }),
        [GET_CUSTOMER_SUCCESS]: (state, action) => ({
            ...state,
            loadingTable: false,
            customerList: action.payload,
        }),
    },
    initialState,
);

export default contractcustomer;