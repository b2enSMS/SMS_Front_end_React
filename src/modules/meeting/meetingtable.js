import { handleActions } from 'redux-actions';
import * as api from '../../lib/api';

export const GET_MEETING = 'meetingtable/GET_MEETING';
export const GET_MEETING_SUCCESS = 'meetingtable/GET_MEETING_SUCCESS';
export const GET_MEETING_FAILURE = 'meetingtable/GET_MEETING_FAILURE';

const DELETE_MEETING = 'meetingtable/DELETE_MEETING';
const DELETE_MEETING_SUCCESS = 'meetingtable/DELETE_MEETING_SUCCESS';
const DELETE_MEETING_FAILURE = 'meetingtable/DELETE_MEETING_FAILURE';

export const getMeetingList = () => async dispatch => {
    dispatch({ type: GET_MEETING });
    try {
        const res = await api.getMeetingList();
        dispatch({
            type: GET_MEETING_SUCCESS,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: GET_MEETING_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

export const deleteMeeting = selectedRowKeys => async dispatch => {
    dispatch({type: DELETE_MEETING});
    try{
        console.log("selectedRowKeysselectedRowKeys",selectedRowKeys);
        await api.deleteMeeting(selectedRowKeys);
        dispatch({type: DELETE_MEETING_SUCCESS});
    }catch(e){
        dispatch({
            type: DELETE_MEETING_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }

    dispatch({ type: GET_MEETING });
    try {
        const response = await api.getMeetingList();
        dispatch({
            type: GET_MEETING_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_MEETING_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

const initialState = {
    meetingList: null,
    loadingTable: false
}

const meetingtable = handleActions(
    {
        [GET_MEETING]: state => ({
            ...state,
            loadingTable: true
        }),
        [GET_MEETING_SUCCESS]: ( state, action ) => ({
            ...state,
            meetingList: action.payload,
            loadingTable: false
        }),
        [GET_MEETING_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),
        [DELETE_MEETING]: state => ({
            ...state,
            loadingTable: true
        }),
        [DELETE_MEETING_SUCCESS]: state => ({
            ...state,
            loadingTable: false
        }),
        [DELETE_MEETING_FAILURE]: state => ({
            ...state,
            loadingTable: false,
        }),
    },
    initialState,
);

export default meetingtable;