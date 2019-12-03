import { handleActions } from 'redux-actions';
import * as api from '../lib/api';



const GET_CONTRACT = 'contracttable/GET_CONTRACT';
const GET_CONTRACT_SUCCESS = 'contracttable/GET_CONTRACT_SUCCESS';
const GET_CONTRACT_FAILURE = 'contracttable/GET_CONTRACT_FAILURE';

// const data = [];
// for (let i = 0; i < 46; i++) {
//     data.push({
//         key: i,
//         orgId: '서울시청',
//         empId: `권대환 ${i}`,
//         contDt: `A1234567 ${i}`,
//         contTotAmt: '11월 15일',
//         delYn: '5월 21일',
//         contReportNo: 'System',
//         //menuTag: menuTag,
//     });
// }



export const getContractList = () =>async dispatch => {
    dispatch({ type: GET_CONTRACT });
    try {
        const response = await api.getContracts();
        dispatch({
            type: GET_CONTRACT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        console.log("error")
        dispatch({
            type: GET_CONTRACT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

const initialState = {
    visible: false,
    contractList: null,
    loadingTable: false
}

const contracttable = handleActions(
    {

        [GET_CONTRACT]: state => ({
            ...state,
            loadingTable: true
        }),
        [GET_CONTRACT_SUCCESS]: (state, action) => ({
            ...state,
            loadingTable: false,
            contractList: action.payload,
        }),
        [GET_CONTRACT_FAILURE]: (state, action) => ({
            ...state,
            loadingTable: false
        }),
    },
    initialState,
);

export default contracttable;