import {createAction, handleActions} from 'redux-actions';
import * as api from '../../lib/api';
import produce from "immer";
import { GET_PRODUCT, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAILURE } from './producttable';

const PRODUCT_INIT = 'productmodal/PRODUCT_INIT';
const BUTTON_CHANGE = 'productmodal/BUTTON_CHANGE';

const HANDLE_CANCEL = "productmodal/HANDLE_CANCEL";
const CHANGE_INPUT = "productmodal/CHANGE_INPUT";

const UPDATE_PRODUCT = 'productmodal/UPDATE_PRODUCT';
const UPDATE_PRODUCT_SUCCESS = 'productmodal/UPDATE_PRODUCT_SUCCESS';
const UPDATE_PRODUCT_FAILURE = 'productmodal/UPDATE_PRODUCT_FAILURE';

const SHOW_MODAL = 'productmodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'productmodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'productmodal/SHOW_MODAL_FAILURE';

const SHOW_UPDATE_MODAL = 'productmodal/SHOW_UPDATE_MODAL';
const SHOW_UPDATE_MODAL_SUCCESS = 'productmodal/SHOW_UPDATE_MODAL_SUCCESS';
const SHOW_UPDATE_MODAL_FAILURE = 'productmodal/SHOW_UPDATE_MODAL_FAILURE';

const POST_PRODUCT = 'productmodal/POST_PRODUCT';
const POST_PRODUCT_SUCCESS = 'productmodal/POST_PRODUCT_SUCCESS';
const POST_PRODUCT_FAILURE = 'productmodal/POST_PRODUCT_FAILURE';

export const getButtonChange = createAction(BUTTON_CHANGE);
export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initialForm = createAction(PRODUCT_INIT, form => form);

export const getShowModal = () =>async dispatch => {
    dispatch({ type: SHOW_MODAL});
    try {
        const response = await api.getProductCD();
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                prdtCd:response.data,
            }
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
        const res = await api.getProduct(product);
        const response = await api.getProductCD();
        dispatch({
            type: SHOW_UPDATE_MODAL_SUCCESS,
            payload: {
                form: res.data,
                prdtCd:response.data,
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
    dispatch({ type: UPDATE_PRODUCT });
    try {
        await api.updateProduct(formData);
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS
        });
        dispatch({
            type: PRODUCT_INIT,
            payload: "productForm"
        });
        dispatch({
            type: GET_PRODUCT
        });
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
    } catch (e) {
        dispatch({
            type: UPDATE_PRODUCT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

export const getHandleCancel = () => dispatch => {
    dispatch({ type: HANDLE_CANCEL });
    dispatch({ type: PRODUCT_INIT, payload: "productForm" });
};

export const handleOk = (formData) => async dispatch => {
    dispatch({ type: POST_PRODUCT });
    try {
        await api.postProduct(formData);
        dispatch({
            type: POST_PRODUCT_SUCCESS
        })
        dispatch({
            type: PRODUCT_INIT,
            payload: "productForm"
        });
        dispatch({
            type: GET_PRODUCT
        });
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
    } catch(e) {
        dispatch({
            type: POST_PRODUCT_FAILURE,
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
    productForm: {
        prdtNm: "",
        prdtDesc: "",
        prdtAmt: "",
        prdtTpCd: "",
        prdtTpCdNm: "",
    },
    prdtCd: [],
};

const productmodal = handleActions(
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
        [SHOW_MODAL_SUCCESS]: (state,{ payload: {prdtCd}}) => ({
            ...state,
            prdtCd:prdtCd
        }),
        [SHOW_UPDATE_MODAL]: state => ({
            ...state,
            visible: true,
        }),
        [SHOW_UPDATE_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [SHOW_UPDATE_MODAL_SUCCESS]: (state, { payload: {form,prdtCd}}) =>
            produce(state, draft => {
                draft["productForm"] = form
                draft["prdtCd"] = prdtCd
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
        [PRODUCT_INIT]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [POST_PRODUCT]: state => ({
            ...state,
            confirmLoading: true,
        }),
        [POST_PRODUCT_SUCCESS]: state => ({
            ...state,
            visible: false,
            confirmLoading: false,
        }),
        [POST_PRODUCT_FAILURE]: state => ({
            ...state,
            visible: false,
            confirmLoading: false,
        }),
        [UPDATE_PRODUCT]: state => ({
            ...state,
            visible: true,
            confirmLoading: true,
        }),
        [UPDATE_PRODUCT_SUCCESS]: state => ({
            ...state,
            visible: false,
            buttonFlag: true,
            confirmLoading: false,
        }),
        [UPDATE_PRODUCT_FAILURE]: state => ({
            ...state,
            visible: false,
            confirmLoading: false,
        }),
    },
    initialState,
);

export default productmodal