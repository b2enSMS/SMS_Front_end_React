import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import * as api from '../../lib/api';

const CHANGE_INPUT = 'licensemodal/CHANGE_INPUT';
const HANDLE_CANCEL = 'licensemodal/HANDLE_CANCLE';

const SHOW_LIMO = 'licensemodal/SHOW_LIMO';
const SHOW_LIMO_SUCCESS = 'licensemodal/SHOW_LIMO_SUCCESS';
const SHOW_LIMO_FAILURE = 'licensemodal/SHOW_LIMO_FAILURE';
const OFF_MODAL = 'licensemodal/OFF_MODAL';
const INITIALIZE_FORM = 'licensemodal/INITIALIZE_FORM'



export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initializeForm = createAction(INITIALIZE_FORM, form => form);

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

export const getHandleCancel = () => dispatch => {
    console.log("getHandleCancel")
    dispatch({ type: HANDLE_CANCEL });
    dispatch({ type: INITIALIZE_FORM, payload: "licenseForm"});
}

export const handleChangeInput = (changeData) => dispatch => {
    console.log(changeData)
    dispatch({ type: CHANGE_INPUT, payload: changeData });
}

export const handleOk = () => dispatch => {
    dispatch({ type: OFF_MODAL });
    dispatch({ type: INITIALIZE_FORM, payload: "licenseForm"});
};

const initialState = {
    visible: false,
    confirmLoading: false,
    licenseForm: {
        lcnsIssuDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        lcnsStartDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        lcnsEndDt: (new Date().getFullYear()+1) + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        prdtId: "",
        prdtNm: "",
        contAmt: "",
        lcnsNo: "",
        certNo: "",
        lcnsTpCd:"",
        lcnsTpNm:"",
        cmmnDetailCd:"",
    },
    products: [],
    licCode: [],
    tempLcnsId: null,
    buttonFlag:true
}

const licensemodal = handleActions(
    {
        [OFF_MODAL]: state => ({
            ...state,
            visible: false,
            confirmLoading: true,
            products: [],
            licCode: [],
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
        }),
        [CHANGE_INPUT]: (state, { payload: { form, key, value } }) => 
            produce(state, draft => {
                draft[form][key] = value
        }),
        [INITIALIZE_FORM]: (state, {payload: form}) => ({
            ...state,
            [form]: initialState[form],
        })
    },
    initialState,
);

export default licensemodal;