import { handleActions, createAction } from 'redux-actions';
import * as api from '../../lib/api';
import produce from 'immer';

const INIT_ORG = 'addorgmodal/INIT_ORG';

const SHOW_ORG_MODAL = 'addorgmodal/SHOW_ORG_MODAL';
const SHOW_ORG_MODAL_SUCCESS = 'addorgmodal/SHOW_ORG_MODAL_SUCCESS';
const SHOW_ORG_MODAL_FAILURE = 'addorgmodal/SHOW_ORG_MODAL_FAILURE';

const HANDLE_CANCEL = 'addorgmodal/HANDLE_CANCEL';
const CHANGE_INPUT = 'addorgmodal/CHANGE_INPUT';
const HANDLE_OK = 'addorgmodal/HANDLE_OK';

export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initialForm = createAction(INIT_ORG, form => form);

export const getShowOrgModal = () => async dispatch => {
    dispatch({ type: SHOW_ORG_MODAL });
    try {
        const res = await api.getCustListMeet();
        dispatch({
            type: SHOW_ORG_MODAL_SUCCESS,
            payload: {
                custList: res.data,
            }
        })
    } catch (e) {
        dispatch({
            type: SHOW_ORG_MODAL_FAILURE,
            error: true
        });
        throw e;
    }
};

export const getHandleCancel = () => dispatch => {
    dispatch({ type: HANDLE_CANCEL });
    dispatch({ type: INIT_ORG, payload: "custModal" });
};

export const handleChangeInput = (changeData) => dispatch => {
    dispatch({
        type: CHANGE_INPUT,
        payload: changeData,
    })
};

export const handleOk = () => dispatch => {
    dispatch({ type: HANDLE_OK });
    dispatch({ type: INIT_ORG, payload: "custModal" });
}

const initialState = {
    visible: false,
    custModal: {
        custNm :'',
    },
    custList: [],
};

const addorgmodal = handleActions(
    {
        [SHOW_ORG_MODAL]: state => ({
            ...state,
            visible: true,
        }),
        [SHOW_ORG_MODAL_SUCCESS]: (state, action) => ({
            ...state,
            custList: action.payload.custList
        }),
        [SHOW_ORG_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [HANDLE_CANCEL]: state => ({
            ...state,
            visible: false,
        }),
        [CHANGE_INPUT]: (state, {payload: {form, key, value}}) =>
            produce(state, draft => {
                draft[form][key] = value
            }),
        [HANDLE_OK]: state => ({
            ...state,
           visible: false,
        }),
        [INIT_ORG]: (state, { payload: form }) => ({
           ...state,
           [form]: initialState[form],
        }),
    },
    initialState,
)

export default addorgmodal;
