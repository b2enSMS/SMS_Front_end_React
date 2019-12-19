import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';

const GET_PRODUCT = 'producttable/GET_PRODUCT';
const GET_PRODUCT_SUCCESS = 'producttable/GET_PRODUCT_SUCCESS';
const GET_PRODUCT_FAILURE = 'producttable/GET_PRODUCT_FAILURE';

export const getProductList = () => async dispatch => {
    dispatch({ type: GET_PRODUCT });
    try {
        const res = await api.getProductList();
        dispatch({
            type: GET_PRODUCT_SUCCESS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: GET_PRODUCT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

const initialState = {
    productList: null,
    loadingTable: false
}

const producttable = handleActions(
    {
        [GET_PRODUCT]: state => ({
            ...state,
            loadingTable: true
        }),
        [GET_PRODUCT_SUCCESS]: ( state, action ) => ({
            ...state,
            productList: action.payload,
            loadingTable: false
        }),
        [GET_PRODUCT_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        })
    },
    initialState,
);

export default producttable;