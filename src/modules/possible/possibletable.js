import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';


export const GET_CONT = 'possibletable/GET_CONT';
export const GET_CONT_SUCCESS = 'possibletable/GET_CONT_SUCCESS';
export const GET_CONT_FAILURE = 'possibletable/GET_CONT_FAILURE';

const DELETE_CONT = 'possibletable/DELETE_CONT';
const DELETE_CONT_SUCCESS = 'possibletable/DELETE_CONT_SUCCESS';
const DELETE_CONT_FAILURE = 'possibletable/DELETE_CONT_FAILURE'

const TABLE_CHANGE = 'possibletable/TABLE_CHANGE'
const TABLE_CHANGE_SUCCESS = 'possibletable/TABLE_CHANGE_SUCCESS'
const TABLE_CHANGE_FAILURE = 'possibletable/TABLE_CHANGE_FAILURE'


export const getfilterHandler = value => async dispatch => {
    dispatch({ type: TABLE_CHANGE })
    console.log("getfilterHandler",value)
    try {
        let response = []
        if (value === 'all') response = await api.getPossibleConts();
        else if(value==='expired')response = await api.getPossibleEX();
        else response =await api.getPossibleToEX();
        dispatch({
            type: TABLE_CHANGE_SUCCESS,
            payload: response.data,

        })
    } catch (e) {
        dispatch({
            type: TABLE_CHANGE_FAILURE,
            payload: e,
            error: true
        })
    }
}

export const getContDelete = selectedRowKeys => async dispatch => {
    dispatch({type: DELETE_CONT});
    try{
        await api.getDeleteConts(selectedRowKeys);
        dispatch({type: DELETE_CONT_SUCCESS});
    }catch(e){
        dispatch({
            type: DELETE_CONT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }

    dispatch({ type: GET_CONT });
    try {
        const response = await api.getPossibleConts();
        dispatch({
            type: GET_CONT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_CONT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

export const getContList = () => async dispatch => {
    dispatch({ type: GET_CONT });
    try {
        const response = await api.getPossibleConts();
        dispatch({
            type: GET_CONT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_CONT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

const initialState = {
    visible: false,
    contList: null,
    loadingTable: false
}

const possibletable = handleActions(
    {
        [TABLE_CHANGE]: state => ({
            ...state,
            loadingTable: true
        }),
        [TABLE_CHANGE_SUCCESS]: (state,action) => ({
            ...state,
            loadingTable: false,
            contList: action.payload,
        }),
        [TABLE_CHANGE_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),

        [DELETE_CONT]: state =>({
            ...state,
            loadingTable:true
        }),

        [DELETE_CONT_SUCCESS]: state =>({
            ...state,
            loadingTable: false,
        }),

        [DELETE_CONT_FAILURE]: state =>({
            ...state,
            loadingTable: false,
        }),


        [GET_CONT]: state => ({
            ...state,
            loadingTable: true
        }),
        [GET_CONT_SUCCESS]: (state, action) => ({
            ...state,
            loadingTable: false,
            contList: action.payload,
        }),
        [GET_CONT_FAILURE]: (state, action) => ({
            ...state,
            loadingTable: false
        }),
    },
    initialState,
);

export default possibletable;