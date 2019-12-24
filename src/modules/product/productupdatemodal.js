import {createAction, handleActions} from 'redux-actions';
import * as api from '../../lib/api';
import produce from "immer";
import { GET_PRODUCT, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAILURE } from './producttable';

const PRODUCT_INIT = 'productupdatemodal/PRODUCT_INIT';
const BUTTON_CHANGE = 'productupdatemodal/BUTTON_CHANGE';

const HANDLE_CANCEL = "productupdatemodal/HANDLE_CANCEL";
const CHANGE_INPUT = "productupdatemodal/CHANGE_INPUT";

const UPDATE_PRODUCT = 'productupdatemodal/UPDATE_PRODUCT';
const UPDATE_PRODUCT_SUCCESS = 'productupdatemodal/UPDATE_PRODUCT_SUCCESS';
const UPDATE_PRODUCT_FAILURE = 'productupdatemodal/UPDATE_PRODUCT_FAILURE';

const SHOW_MODAL = 'productupdatemodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'productupdatemodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'productupdatemodal/SHOW_MODAL_FAILURE';

const POST_PRODUCT = 'productupdatemodal/POST_PRODUCT';
const POST_PRODUCT_SUCCESS = 'productupdatemodal/POST_PRODUCT_SUCCESS';
const POST_PRODUCT_FAILURE = 'productupdatemodal/POST_PRODUCT_FAILURE';

export const getButtonChange = createAction(BUTTON_CHANGE);
export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initialForm = createAction(PRODUCT_INIT, form => form);

export const getShowModal = () => dispatch => {
    dispatch({ type: SHOW_MODAL});
    try {
        dispatch({
            type: SHOW_MODAL_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type: SHOW_MODAL_FAILURE,
        })
    }
}

export const getShowUpdateModal = product => async dispatch => {
    dispatch({ type: SHOW_MODAL });
    try {
        const res = await api.getProduct(product);
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                form: res.data,
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

export const handleUpdateOk = (formData) => async dispatch => {
    dispatch({ type: UPDATE_PRODUCT });
    try {
        await api.updateProduct(formData);
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS
        });
        dispatch({
            type: PRODUCT_INIT,
            payload: "productModal"
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
    dispatch({ type: PRODUCT_INIT, payload: "productModal" });
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
            payload: "productModal"
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
    updateVisible: false,
    buttonFlag: true,
    productModal: {
        prdtNm: "",
        prdtDesc: "",
        prdtAmt: "",
        prdtTpCd: "",
    },
};

const productupdatemodal = handleActions(
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
        [SHOW_MODAL_SUCCESS]: (state, { payload: {form}}) =>
            produce(state, draft => {
                draft["productModal"] = form
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
        [PRODUCT_INIT]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [POST_PRODUCT]: state => ({
            ...state,
        }),
        [POST_PRODUCT_SUCCESS]: state => ({
            ...state,
            updateVisible: false,
        }),
        [POST_PRODUCT_FAILURE]: state => ({
            ...state,
            updateVisible: false,
        }),
        [UPDATE_PRODUCT]: state => ({
            ...state,
        }),
        [UPDATE_PRODUCT_SUCCESS]: state => ({
            ...state,
            updateVisible: false,
        }),
        [UPDATE_PRODUCT_FAILURE]: state => ({
            ...state,
            updateVisible: false,
        }),
    },
    initialState,
);

export default productupdatemodal