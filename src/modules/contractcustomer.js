import { handleActions } from 'redux-actions';
import * as api from '../lib/api';

const GET_CUSTOMER = 'contractcustomer/GET_CUSTOMER';
const GET_CUSTOMER_SUCCESS = 'contractcustomer/GET_CUSTOMER_SUCCESS';
const GET_CUSTOMER_FAILURE = 'contractcustomer/GET_CUSTOMER_FAILURE';

export const getCustomerList = () => async dispatch => {
    dispatch({ type: GET_CUSTOMER });
    try {
        const response = await api.getManagers();
        dispatch({
           type: GET_CUSTOMER_SUCCESS,
           payload: response.data
        });
    } catch (e) {
        console.log("err");
        dispatch({
            type: GET_CUSTOMER_FAILURE,
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