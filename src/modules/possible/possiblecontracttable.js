import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';


export const GET_POSSIBLE = 'possiblecontracttable/GET_POSSIBLE';
export const GET_POSSIBLE_SUCCESS = 'possiblecontracttable/GET_POSSIBLE_SUCCESS';
export const GET_POSSIBLE_FAILURE = 'possiblecontracttable/GET_POSSIBLE_FAILURE';

const DELETE_POSSIBLE = 'possiblecontracttable/DELETE_POSSIBLE';
const DELETE_POSSIBLE_SUCCESS = 'possiblecontracttable/DELETE_POSSIBLE_SUCCESS';
const DELETE_POSSIBLE_FAILURE = 'possiblecontracttable/DELETE_POSSIBLE_FAILURE';


export const getDeleteData = selectedRowKeys => async dispatch => {
    dispatch({type: DELETE_POSSIBLE});
    try{
        await api.deletePossibleContract(selectedRowKeys);
        dispatch({type: DELETE_POSSIBLE_SUCCESS});
    }catch(e){
        dispatch({
            type: DELETE_POSSIBLE_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }

    dispatch({ type: GET_POSSIBLE });
    try {
        const response = await api.getPossibleContractList();
        dispatch({
            type: GET_POSSIBLE_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_POSSIBLE_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

export const getPossibleList = () => async dispatch => {
    dispatch({ type: GET_POSSIBLE });
    try {
        const response = await api.getPossibleContractList();
        dispatch({
            type: GET_POSSIBLE_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_POSSIBLE_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

const initialState = {
    visible: false,
    possibleList: null,
    loadingTable: false,
}

const possiblecontracttable = handleActions(
    {

        [DELETE_POSSIBLE]: state =>({
            ...state,
            loadingTable:true
        }),

        [DELETE_POSSIBLE_SUCCESS]: state =>({
            ...state,
            loadingTable: false,
        }),

        [DELETE_POSSIBLE_FAILURE]: state =>({
            ...state,
            loadingTable: false,
        }),


        [GET_POSSIBLE]: state => ({
            ...state,
            loadingTable: true
        }),
        [GET_POSSIBLE_SUCCESS]: (state, action) => ({
            ...state,
            loadingTable: false,
            possibleList: action.payload,
        }),
        [GET_POSSIBLE_FAILURE]: (state, action) => ({
            ...state,
            loadingTable: false
        }),
    },
    initialState,
);

export default possiblecontracttable;