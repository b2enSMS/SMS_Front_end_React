import { handleActions, createAction } from 'redux-actions';
import * as api from '../lib/api';

const CHANGE_INPUT = 'licensemodal/CHANGE_INPUT';
const HANDLE_CANCEL = 'licensemodal/HANDLE_CANCLE';

const SHOW_LIMO = 'licensemodal/SHOW_LIMO';
const SHOW_LIMO_SUCCESS = 'licensemodal/SHOW_LIMO_SUCCESS';
const SHOW_LIMO_FAILURE = 'licensemodal/SHOW_LIMO_FAILURE';

const POST_LICENSE = 'licensemodal/POST_LICENSE';
const POST_LICENSE_SUCCESS = 'licensemodal/POST_LICENSE_SUCCESS';
const POST_LICENSE_FAILURE = 'licensemodal/POST_LICENSE_FAILURE';


export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));

export const getShowModal = () => async dispatch => {
    dispatch({ type: SHOW_LIMO });
    try {
        const responseProduct = await api.getProducts();
        //const responseLicenseCode = null;//await api.getLicenseCode();
        dispatch({
            type: SHOW_LIMO_SUCCESS,
            payload: {
                products: responseProduct.data,
                //licCode: responseLicenseCode.data,
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
}

export const handleChangeInput = (changeData) => dispatch => {
    console.log(changeData)
    dispatch({ type: CHANGE_INPUT, payload: changeData });
}

export const handleOk = (formData) => async dispatch => {

    dispatch({ type: POST_LICENSE });
    try {
        await api.postLicense(formData);
        dispatch({
            type: POST_LICENSE_SUCCESS,
        });
    } catch (e) {
        dispatch({
            type: POST_LICENSE_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};


const initialState = {
    visible: false,
    confirmLoading: false,
    contractModal: {
        contDt: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
        installDt: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
        checkDt: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
        mtncStartDt: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
        mtncEndDt: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()
    },
    licenseForm: [],
    products: [],
    licCode: [],
}

const licensemodal = handleActions(
    {

        [SHOW_LIMO]: state => ({
            ...state,
            visible: true,
        }),
        [SHOW_LIMO_SUCCESS]: (state, action) => ({
            ...state,
            products: action.payload.products,
            //licCode: action.payload.licCode
        }),

        [SHOW_LIMO_FAILURE]: (state) => ({
            ...state,
        }),

        [HANDLE_CANCEL]: state => ({
            ...state,
            visible: false,
        }),

        [CHANGE_INPUT]: (state, { payload: { form, key, value } }) => {
            const newState = Object.assign(
                {}, state
            );
            newState[form][key] = value
            //newState.visible = true
            return newState
        },
        [POST_LICENSE]: state => ({
            ...state,
            confirmLoading: true,
        }),
        [POST_LICENSE_SUCCESS]: (state, action) => ({
            ...state,
            confirmLoading: false,
            visible: false
        }),
        [POST_LICENSE_FAILURE]: (state, action) => ({
            ...state,
            confirmLoading: false,
        }),
    },
    initialState,
);

export default licensemodal;