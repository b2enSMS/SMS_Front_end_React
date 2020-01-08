import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';

export const GET_MANAGER = 'managertable/GET_MANAGER';
export const GET_MANAGER_SUCCESS = 'managertable/GET_MANAGER_SUCCESS';
export const GET_MANAGER_FAILURE = 'managertable/GET_MANAGER_FAILURE';

const DELETE_MANAGER = 'managertable/DELETE_MANAGER';
const DELETE_MANAGER_SUCCESS = 'managertable/DELETE_MANAGER_SUCCESS';
const DELETE_MANAGER_FAILURE = 'managertable/DELETE_MANAGER_FAILURE';

export const getManagerList = () => async dispatch => {
    dispatch({ type: GET_MANAGER });
    try {
        const res = await api.getManagerList();
        dispatch({
            type: GET_MANAGER_SUCCESS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: GET_MANAGER_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

export const deleteManager = selectedRowKeys => async dispatch => {
    dispatch({type: DELETE_MANAGER});
    try{
        await api.deleteManager(selectedRowKeys);
        dispatch({type: DELETE_MANAGER_SUCCESS});
    }catch(e){
        dispatch({
            type: DELETE_MANAGER_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }

    dispatch({ type: GET_MANAGER });
    try {
        const response = await api.getManagerList();
        dispatch({
            type: GET_MANAGER_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_MANAGER_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

const initialState = {
    managerList: null,
    loadingTable: false
}

const managertable = handleActions(
    {
        [GET_MANAGER]: state => ({
            ...state,
            loadingTable: true
        }),
        [GET_MANAGER_SUCCESS]: ( state, action ) => ({
            ...state,
            managerList: action.payload,
            loadingTable: false
        }),
        [GET_MANAGER_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),
        [DELETE_MANAGER]: state => ({
            ...state,
            loadingTable: true
        }),
        [DELETE_MANAGER_SUCCESS]: state => ({
            ...state,
            loadingTable: false
        }),
        [DELETE_MANAGER_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),
    },
    initialState,
);

export default managertable;