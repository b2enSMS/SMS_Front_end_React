import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import * as api from '../../lib/api';

const CHANGE_INPUT = 'possiblelicense/CHANGE_INPUT';
const HANDLE_CANCEL = 'possiblelicense/HANDLE_CANCLE';

const SHOW_LIMO = 'possiblelicense/SHOW_LIMO';
const SHOW_LIMO_SUCCESS = 'possiblelicense/SHOW_LIMO_SUCCESS';
const SHOW_LIMO_FAILURE = 'possiblelicense/SHOW_LIMO_FAILURE';
const OFF_MODAL = 'possiblelicense/OFF_MODAL';
const INITIALIZE_FORM = 'possiblelicense/INITIALIZE_FORM';


const MODIFY_LICENSE = 'possiblelicense/MODIFY_LICENSE';
const MODIFY_LICENSE_SUCCESS = 'possiblelicense/MODIFY_LICENSE_SUCCESS';
const MODIFY_LICENSE_FAILURE = 'possiblelicense/MODIFY_LICENSE_FAILURE';

const BUTTON_CHANGE = 'possiblelicense/BUTTON_CHANGE'

export const licenseButtonChange = createAction(BUTTON_CHANGE);

export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initializeForm = createAction(INITIALIZE_FORM, form => form);

export const licenseUpdateHandler = (formData,key) => async dispatch => {
    dispatch({ type: MODIFY_LICENSE })
    try {
        const responseProduct = await api.getProducts();
        const responseLicenseCode = await api.getLicenseCode();
        dispatch({
            type: MODIFY_LICENSE_SUCCESS,
            payload: {
                form: formData,
                products: responseProduct.data,
                licCode: responseLicenseCode.data,
                key: key,
            }
        })
    } catch (e) {
        dispatch({
            type: MODIFY_LICENSE_FAILURE,
            payload: e,
            error: true
        });
        throw (e);
    }
}

export const getShowModal = () => async dispatch => {
    dispatch({ type: SHOW_LIMO });
    try {
        const responseProduct = await api.getProducts();
        const responseLicenseCode = await api.getLicenseCode();
        dispatch({
            type: SHOW_LIMO_SUCCESS,
            payload: {
                products: responseProduct.data,
                licCode: responseLicenseCode.data,
            }
        });
    } catch (e) {
        dispatch({
            type: SHOW_LIMO_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

export const getHandleCancel = () => async dispatch => {
        dispatch({ type: HANDLE_CANCEL });
        dispatch({ type: INITIALIZE_FORM, payload: "licenseForm" });
}
export const gethandleUpdateCancel = () => dispatch =>{
    dispatch({ type: HANDLE_CANCEL });
        dispatch({ type: INITIALIZE_FORM, payload: "licenseForm" });
}

export const handleChangeInput = (changeData) => dispatch => {
    console.log(changeData)
    dispatch({ type: CHANGE_INPUT, payload: changeData });
}

export const handleOk = () => dispatch => {
    dispatch({ type: OFF_MODAL });
    dispatch({ type: INITIALIZE_FORM, payload: "licenseForm" });
};

const initialState = {
    visible: false,
    confirmLoading: false,
    licenseForm: {
        lcnsIssuDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        lcnsStartDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        lcnsEndDt: (new Date().getFullYear() + 1) + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        prdtId: "",
        prdtNm: "",
        lcnsTpCd: "",
        lcnsTpNm: "",
        cmmnDetailCd: "",
    },
    products: [],
    licCode: [],
    tempLcnsId: null,
    btnFlag: true,
    keyIndex: 0,
}

const possiblelicense = handleActions(
    {
        [BUTTON_CHANGE]: state => ({
            ...state,
            btnFlag: false,
        }),

        [MODIFY_LICENSE]: state => ({
            ...state,
            confirmLoading: true,
            visible: true,
        }),

        [MODIFY_LICENSE_SUCCESS]: (state, { payload: { form, products, licCode,key } }) =>
            produce(state, draft => {
                console.log("MODIFY_LICENSE_SUCCESS", form)
                draft["licCode"] = licCode
                draft["products"] = products
                draft["licenseForm"] = form
                draft["confirmLoading"] = false
                draft["keyIndex"] = key
            }),

        [MODIFY_LICENSE_FAILURE]: (state, action) => ({
            ...state,
            confirmLoading: false,
        }),

        [OFF_MODAL]: state => ({
            ...state,
            visible: false,
            confirmLoading: true,
            products: [],
            licCode: [],
            btnFlag: true,
        }),
        [SHOW_LIMO]: state => ({
            ...state,
            visible: true,
            confirmLoading: false,
        }),
        [SHOW_LIMO_SUCCESS]: (state, action) => ({
            ...state,
            products: action.payload.products,
            licCode: action.payload.licCode
        }),
        [SHOW_LIMO_FAILURE]: (state) => ({
            ...state,
        }),
        [HANDLE_CANCEL]: state => ({
            ...state,
            visible: false,
            btnFlag: true,
        }),
        [CHANGE_INPUT]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                draft[form][key] = value
            }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        })
    },
    initialState,
);

export default possiblelicense;