import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';

export const GET_POSSIBLE_CUSTOMER = 'possiblecustomertable/GET_POSSIBLE_CUSTOMER';
export const GET_POSSIBLE_CUSTOMER_SUCCESS = 'possiblecustomertable/GET_POSSIBLE_CUSTOMER_SUCCESS';
export const GET_POSSIBLE_CUSTOMER_FAILURE = 'possiblecustomertable/GET_POSSIBLE_CUSTOMER_FAILURE';

const DELETE_POSSIBLE_CUSTOMER = 'possiblecustomertable/DELETE_POSSIBLE_CUSTOMER';
const DELETE_POSSIBLE_CUSTOMER_SUCCESS = 'possiblecustomertable/DELETE_POSSIBLE_CUSTOMER_SUCCESS';
const DELETE_POSSIBLE_CUSTOMER_FAILURE = 'possiblecustomertable/DELETE_POSSIBLE_CUSTOMER_FAILURE';

export const getPossibleCustomerList = () => async dispatch => {
    dispatch({ type: GET_POSSIBLE_CUSTOMER });
    try {
        const res = await api.getPresaleCustomerList();
        console.log("resrersrserserserser", res);
        dispatch({
            type: GET_POSSIBLE_CUSTOMER_SUCCESS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: GET_POSSIBLE_CUSTOMER_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

export const deletePossibleCustomer = selectedRowKeys => async dispatch => {
    dispatch({type: DELETE_POSSIBLE_CUSTOMER});
    try{
        console.log("selectedRowKeysselectedRowKeys",selectedRowKeys);
        await api.deleteCustomer(selectedRowKeys);
        dispatch({type: DELETE_POSSIBLE_CUSTOMER_SUCCESS});
    }catch(e){
        dispatch({
            type: DELETE_POSSIBLE_CUSTOMER_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }

    dispatch({ type: GET_POSSIBLE_CUSTOMER });
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
}

const initialState = {
    possibleCustomerList: null,
    loadingTable: false
}

const possiblecustomertable = handleActions(
    {
        [GET_POSSIBLE_CUSTOMER]: state => ({
            ...state,
            loadingTable: true
        }),
        [GET_POSSIBLE_CUSTOMER_SUCCESS]: ( state, action ) => ({
            ...state,
            possibleCustomerList: action.payload,
            loadingTable: false
        }),
        [GET_POSSIBLE_CUSTOMER_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),
        [DELETE_POSSIBLE_CUSTOMER]: state => ({
            ...state,
            loadingTable: true
        }),
        [DELETE_POSSIBLE_CUSTOMER_SUCCESS]: state => ({
            ...state,
            loadingTable: false
        }),
        [DELETE_POSSIBLE_CUSTOMER_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),
    },
    initialState,
);

export default possiblecustomertable;