import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';

export const GET_COMPANY = 'companytable/GET_COMPANY';
export const GET_COMPANY_SUCCESS = 'companytable/GET_MANAGER_SUCCESS';
export const GET_COMPANY_FAILURE = 'companytable/GET_MANAGER_FAILURE';

const DELETE_COMPANY = 'companytable/DELETE_COMPANY';
const DELETE_COMPANY_SUCCESS = 'companytable/DELETE_MANAGER_SUCCESS';
const DELETE_COMPANY_FAILURE = 'companytable/DELETE_MANAGER_FAILURE';

export const getCompanyList = () => async dispatch => {
    dispatch({ type: GET_COMPANY });
    try {
        const res = await api.getOrgList();
        dispatch({
            type: GET_COMPANY_SUCCESS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: GET_COMPANY_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

export const deleteCompany = selectedRowKeys => async dispatch => {
    dispatch({type: DELETE_COMPANY});
    try{
        console.log("selectedRowKeysselectedRowKeys",selectedRowKeys);
        await api.deleteCompany(selectedRowKeys);
        dispatch({type: DELETE_COMPANY_SUCCESS});
    }catch(e){
        dispatch({
            type: DELETE_COMPANY_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }

    dispatch({ type: GET_COMPANY });
    try {
        const response = await api.getOrgList();
        dispatch({
            type: GET_COMPANY_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_COMPANY_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

const initialState = {
    companyList: null,
    loadingTable: false
}

const companytable = handleActions(
    {
        [GET_COMPANY]: state => ({
            ...state,
            loadingTable: true
        }),
        [GET_COMPANY_SUCCESS]: ( state, action ) => ({
            ...state,
            companyList: action.payload,
            loadingTable: false
        }),
        [GET_COMPANY_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),
        [DELETE_COMPANY]: state => ({
            ...state,
            loadingTable: true
        }),
        [DELETE_COMPANY_SUCCESS]: state => ({
            ...state,
            loadingTable: false
        }),
        [DELETE_COMPANY_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),
    },
    initialState,
);

export default companytable;