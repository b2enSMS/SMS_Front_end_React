import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';

export const GET_PRODUCT = 'producttable/GET_PRODUCT';
export const GET_PRODUCT_SUCCESS = 'producttable/GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE = 'producttable/GET_PRODUCT_FAILURE';

const DELETE_PRODUCT = 'producttable/DELETE_PRODUCT';
const DELETE_PRODUCT_SUCCESS = 'producttable/DELETE_PRODUCT_SUCCESS';
const DELETE_PRODUCT_FAILURE = 'producttable/DELETE_PRODUCT_FAILURE';

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

export const getDeleteProduct = selectedRowKeys => async dispatch => {
    dispatch({type: DELETE_PRODUCT});
    try{
        console.log("selectedRowKeysselectedRowKeys",selectedRowKeys);
        await api.getDeleteProducts(selectedRowKeys);
        dispatch({type: DELETE_PRODUCT_SUCCESS});
    }catch(e){
        dispatch({
            type: DELETE_PRODUCT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }

    dispatch({ type: GET_PRODUCT });
    try {
        const response = await api.getProductList();
        dispatch({
            type: GET_PRODUCT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_PRODUCT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

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
        }),
        [DELETE_PRODUCT]: state => ({
            ...state,
            loadingTable: true
        }),
        [DELETE_PRODUCT_SUCCESS]: state => ({
            ...state,
            loadingTable: false
        }),
        [DELETE_PRODUCT_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),
    },
    initialState,
);

export default producttable;