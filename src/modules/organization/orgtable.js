import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';

export const GET_ORG = 'orgtable/GET_ORG';
export const GET_ORG_SUCCESS = 'orgtable/GET_ORG_SUCCESS';
export const GET_ORG_FAILURE = 'orgtable/GET_ORG_FAILURE';

const DELETE_ORG = 'orgtable/DELETE_ORG';
const DELETE_ORG_SUCCESS = 'orgtable/DELETE_ORG_SUCCESS';
const DELETE_ORG_FAILURE = 'orgtable/DELETE_ORG_FAILURE';

export const getOrgList = () => async dispatch => {
    dispatch({ type: GET_ORG });
    try {
        const res = await api.getOrgList();
        dispatch({
            type: GET_ORG_SUCCESS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: GET_ORG_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

export const deleteOrg = selectedRowKeys => async dispatch => {
    dispatch({type: DELETE_ORG});
    try{
        console.log("deleteOrg selectedRowKeys",selectedRowKeys);
        await api.deleteOrg(selectedRowKeys);
        dispatch({type: DELETE_ORG_SUCCESS});
    }catch(e){
        dispatch({
            type: DELETE_ORG_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }

    dispatch({ type: GET_ORG });
    try {
        const response = await api.getOrgList();
        dispatch({
            type: GET_ORG_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_ORG_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

const initialState = {
    orgList: null,
    loadingTable: false
}

const orgtable = handleActions(
    {
        [GET_ORG]: state => ({
            ...state,
            loadingTable: true
        }),
        [GET_ORG_SUCCESS]: ( state, action ) => ({
            ...state,
            orgList: action.payload,
            loadingTable: false
        }),
        [GET_ORG_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),
        [DELETE_ORG]: state => ({
            ...state,
            loadingTable: true
        }),
        [DELETE_ORG_SUCCESS]: state => ({
            ...state,
            loadingTable: false
        }),
        [DELETE_ORG_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),
    },
    initialState,
);

export default orgtable;