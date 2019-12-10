import { handleActions, createAction } from 'redux-actions';
import * as api from '../lib/api';

const CHANGE_INPUT = 'contractcustomermodal/CHANGE_INPUT';
const HANDLE_CANCEL = 'contractcustomermodal/HANDLE_CANCEL';

const SHOW_MODAL = 'contractcustomermodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'contractcustomermodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'contractcustomermodal/SHOW_MODAL_FAILURE';

const POST_CUSTOMER = 'contractcustomermodal/POST_CUSTOMER';
const POST_CUSTOMER_SUCCESS = 'contractcustomermodal/POST_CUSTOMER_SUCCESS';
const POST_CUSTOMER_FAILURE = 'contractcustomermodal/POST_CUSTOMER_FAILURE';

export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value}) => ({form, key, value}));

export const getShowCustomerModal = () => async dispatch => {
    console.log("showModal");
    dispatch({ type: SHOW_MODAL });
    try {
        const response = await api.getOrganization();
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                org: response.data,
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

export const getHandleCancel = () => dispatch => {
    dispatch({ type: HANDLE_CANCEL });
};

export const handleChangeInput = (changeData) => dispatch => {
    dispatch({ type: CHANGE_INPUT, payload: changeData });
};

export const handleOk = (formData) => async dispatch => {
    dispatch({ type: POST_CUSTOMER });
    try {
        await api.postCustomer(formData);
        dispatch({ type: POST_CUSTOMER_SUCCESS });
    } catch(e) {
        dispatch({
            type: POST_CUSTOMER_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

const initialState = {
    visible: false,
    confirmLoading: false,
    contractCustomerModal: {},
    orgList: [],
};

const contractcustomermodal = handleActions(
    {
        [SHOW_MODAL]: state => ({
           ...state,
           visible: true,
        }),
        [SHOW_MODAL_SUCCESS]: (state, action) => ({
            ...state,
            orgList: action.payload.org,
        }),
        [SHOW_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [HANDLE_CANCEL]: state => ({
            ...state,
            visible: false,
        }),
        [CHANGE_INPUT]: (state, { payload: { form, key, value}}) => {
            const newState = Object.assign(
                {}, state
            );
            newState[form][key] = value
            return newState
        },
        [POST_CUSTOMER]: state => ({
            ...state,
            confirmLoading: true,
        }),
        [POST_CUSTOMER_SUCCESS]: (state, action) => ({
            ...state,
            confirmLoading: false,
            visible: false
        }),
        [POST_CUSTOMER_FAILURE]: state => ({
            ...state,
            confirmLoading: false,
        }),
    },
    initialState,
);

export default contractcustomermodal;