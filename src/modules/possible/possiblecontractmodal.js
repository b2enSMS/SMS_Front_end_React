import { handleActions, createAction } from 'redux-actions';
//import * as api from '../../lib/api';
//import produce from 'immer';
//import {GET_CONTRACT, GET_CONTRACT_SUCCESS, GET_CONTRACT_FAILURE} from '../contract/contracttable'

const CHANGE_INPUT = 'possiblecontractmodal/CHANGE_INPUT';
//const HANDLE_CANCEL = 'possiblecontractmodal/HANDLE_CANCLE';

const SHOW_MODAL = 'possiblecontractmodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'possiblecontractmodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'possiblecontractmodal/SHOW_MODAL_FAILURE';

// const POST_POSSIBLE = 'possiblecontractmodal/POST_POSSIBLE';
// const POST_POSSIBLE_SUCCESS = 'possiblecontractmodal/POST_CONTRACT_SUCCESS';
// const POST_POSSIBLE_FAILURE = 'possiblecontractmodal/POST_CONTRACT_FAILURE';

// const UPDATE_CONTRACT = 'possiblecontractmodal/UPDATE_CONTRACT'
// const UPDATE_CONTRACT_SUCCESS = 'possiblecontractmodal/UPDATE_CONTRACT_SUCCESS'
// const UPDATE_CONTRACT_FAILURE = 'possiblecontractmodal/UPDATE_CONTRACT_FAILURE'


// const INPUT_LICENSE = 'possiblecontractmodal/INPUT_LICENSE';

// const REMOVE_LICENSE = 'possiblecontractmodal/REMOVE_LICENSE';
const INITIALIZE_FORM = 'possiblecontractmodal/INITIALIZE_FORM'

const BUTTON_CHANGE = 'possiblecontractmodal/BUTTON_CHANGE'

export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const getButtonChange = createAction(BUTTON_CHANGE);


export const getShowModal = () => async dispatch => {
    dispatch({ type: SHOW_MODAL });
    try {
        dispatch({
            type: SHOW_MODAL_SUCCESS,
        });
    } catch (e) {
        dispatch({
            type: SHOW_MODAL_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}




const initialState = {
    visible: false,
}

const possiblecontractmodal = handleActions(
    {
        [SHOW_MODAL]: state => ({
            ...state,
            visible: true,
        }),
        [SHOW_MODAL_SUCCESS]: (state, action) => ({
            ...state,
        }),

        [SHOW_MODAL_FAILURE]: (state) => ({
            ...state,
        }),
    },
    initialState,
);

export default possiblecontractmodal;