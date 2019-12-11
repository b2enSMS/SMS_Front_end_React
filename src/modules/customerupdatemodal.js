import { handleActions } from 'redux-actions';
import * as api from '../lib/api';

const UPDATE = 'contractcustomermodal/UPDATE';
const UPDATE_SUCCESS = 'contractcustomermodal/UPDATE_SUCCESS';
const UPDATE_FAILURE = 'contractcustomermodal/UPDATE_FAILURE';

const SHOW_MODAL = 'contractcustomermodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'contractcustomermodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'contractcustomermodal/SHOW_MODAL_FAILURE';

export const getShowUpdateModal = () => async dispatch => {
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

export const updateCustomer = () => async dispatch => {
    dispatch({type: UPDATE});
    try {
        await api.updateCustomer();
        dispatch({
            type: UPDATE_SUCCESS,
        })
    } catch (e) {
        dispatch({
            type: UPDATE_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

const initialState = {
    visible: false,
    orgList: [],
};

const customerupdatemodal = handleActions(
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
        [UPDATE]: state => ({
            ...state,
            visible: true,
        }),
        [UPDATE_SUCCESS]: (state, action) => ({
            ...state,
        }),
        [UPDATE_FAILURE]: state => ({
            ...state,
        }),
    },
    initialState,
);

export default customerupdatemodal