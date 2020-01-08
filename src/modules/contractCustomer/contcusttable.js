import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';

export const GET_CUSTOMER = 'contcusttable/GET_CUSTOMER';
export const GET_CUSTOMER_SUCCESS = 'contcusttable/GET_CUSTOMER_SUCCESS';
export const GET_CUSTOMER_FAILURE = 'contcusttable/GET_CUSTOMER_FAILURE';

const DELETE_CUSTOMER = 'contcusttable/DELETE_CUSTOMER';
const DELETE_CUSTOMER_SUCCESS = 'contcusttable/DELETE_CUSTOMER_SUCCESS';
const DELETE_CUSTOMER_FAILURE = 'contcusttable/DELETE_CUSTOMER_FAILURE';

export const getContCustList = () => async dispatch => {
    dispatch({ type: GET_CUSTOMER });
    try {
        const res = await api.getContCustList();
        console.log("resrersrserserserser", res);
        dispatch({
            type: GET_CUSTOMER_SUCCESS,
            payload: res.data
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

export const deleteContCust = selectedRowKeys => async dispatch => {
    dispatch({type: DELETE_CUSTOMER});
    try{
        console.log("selectedRowKeysselectedRowKeys",selectedRowKeys);
        await api.deleteCustomer(selectedRowKeys);
        dispatch({type: DELETE_CUSTOMER_SUCCESS});
    }catch(e){
        dispatch({
            type: DELETE_CUSTOMER_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }

    dispatch({ type: GET_CUSTOMER });
    try {
        const response = await api.getPresaleCustomerList();
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
}

const initialState = {
    contCustList: null,
    loadingTable: false
}

const contcusttable = handleActions(
    {
        [GET_CUSTOMER]: state => ({
            ...state,
            loadingTable: true
        }),
        [GET_CUSTOMER_SUCCESS]: ( state, action ) => ({
            ...state,
            contCustList: action.payload,
            loadingTable: false
        }),
        [GET_CUSTOMER_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),
        [DELETE_CUSTOMER]: state => ({
            ...state,
            loadingTable: true
        }),
        [DELETE_CUSTOMER_SUCCESS]: state => ({
            ...state,
            loadingTable: false
        }),
        [DELETE_CUSTOMER_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),
    },
    initialState,
);

export default contcusttable;