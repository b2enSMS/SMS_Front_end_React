import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';
import { message } from 'antd';

export const GET_CONTRACT = 'contracttable/GET_CONTRACT';
export const GET_CONTRACT_SUCCESS = 'contracttable/GET_CONTRACT_SUCCESS';
export const GET_CONTRACT_FAILURE = 'contracttable/GET_CONTRACT_FAILURE';

const DELETE_CONTRACT = 'contracttable/DELETE_CONTRACT';
const DELETE_CONTRACT_SUCCESS = 'contracttable/DELETE_CONTRACT_SUCCESS';
const DELETE_CONTRACT_FAILURE = 'contracttable/DELETE_CONTRACT_FAILURE'

//테이블 로우 다중 삭제
export const getDeleteData = selectedRowKeys => async dispatch => {
    dispatch({type: DELETE_CONTRACT});
    try{
        await api.getDeleteContracts(selectedRowKeys);
        dispatch({type: DELETE_CONTRACT_SUCCESS});
        message.success('삭제 완료');
    }catch(e){
        dispatch({
            type: DELETE_CONTRACT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }

    dispatch({ type: GET_CONTRACT });
    try {
        const response = await api.getContracts();
        dispatch({
            type: GET_CONTRACT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_CONTRACT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}
//테이블에 계약 정보 리스트 넣기
export const getContractList = () => async dispatch => {
    dispatch({ type: GET_CONTRACT });
    try {
        const response = await api.getContracts();
        dispatch({
            type: GET_CONTRACT_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_CONTRACT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

/*
visible: true/false 모달 띄우기
contractList: 모든 계약 정보
loadingTable: true/false 테이블 로딩
*/
const initialState = {
    visible: false,
    contractList: null,
    loadingTable: false
}

const contracttable = handleActions(
    {

        [DELETE_CONTRACT]: state =>({
            ...state,
            loadingTable:true
        }),

        [DELETE_CONTRACT_SUCCESS]: state =>({
            ...state,
            loadingTable: false,
        }),

        [DELETE_CONTRACT_FAILURE]: state =>({
            ...state,
            loadingTable: false,
        }),


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