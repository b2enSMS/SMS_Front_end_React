import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';

const GET_COMPANY = 'producttable/GET_COMPANY';
const GET_COMPANY_SUCCESS = 'producttable/GET_COMPANY_SUCCESS';
const GET_COMPANY_FAILURE = 'producttable/GET_COMPANY_FAILURE';

export const getCompanyList = () => async dispatch => {
    dispatch({ type: GET_COMPANY });
    try {
        const res = await api.getCompanyList();
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
            productList: action.payload,
            loadingTable: false
        }),
        [GET_COMPANY_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        })
    },
    initialState,
);

export default companytable;