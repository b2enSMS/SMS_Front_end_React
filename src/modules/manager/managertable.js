import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';

const GET_MANAGER = 'managertable/GET_MANAGER';
const GET_MANAGER_SUCCESS = 'managertable/GET_MANAGER_SUCCESS';
const GET_MANAGER_FAILURE = 'managertable/GET_MANAGER_FAILURE';

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

const initialState = {
    managerList: null,
    loadingTable: false
}

const producttable = handleActions(
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
        })
    },
    initialState,
);

export default producttable;