import {createAction, handleActions} from 'redux-actions';
import * as api from '../../lib/api';
import produce from "immer";
import { GET_MEETING, GET_MEETING_SUCCESS, GET_MEETING_FAILURE } from './meetingtable';

const MEETING_INIT = 'meetingmodal/MEETING_INIT';
const BUTTON_CHANGE = 'meetingmodal/BUTTON_CHANGE';

const HANDLE_CANCEL = "meetingmodal/HANDLE_CANCEL";
const CHANGE_INPUT = "meetingmodal/CHANGE_INPUT";

const UPDATE_MEETING = 'meetingmodal/UPDATE_MEETING';
const UPDATE_MEETING_SUCCESS = 'meetingmodal/UPDATE_MEETING_SUCCESS';
const UPDATE_MEETING_FAILURE = 'meetingmodal/UPDATE_MEETING_FAILURE';

const SHOW_MODAL = 'meetingmodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'meetingmodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'meetingmodal/SHOW_MODAL_FAILURE';

const SHOW_UPDATE_MODAL = 'meetingmodal/SHOW_UPDATE_MODAL';
const SHOW_UPDATE_MODAL_SUCCESS = 'meetingmodal/SHOW_UPDATE_MODAL_SUCCESS';
const SHOW_UPDATE_MODAL_FAILURE = 'meetingmodal/SHOW_UPDATE_MODAL_FAILURE';

const POST_MEETING = 'meetingmodal/POST_MEETING';
const POST_MEETING_SUCCESS = 'meetingmodal/POST_MEETING_SUCCESS';
const POST_MEETING_FAILURE = 'meetingmodal/POST_MEETING_FAILURE';

export const getButtonChange = createAction(BUTTON_CHANGE);
export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initialForm = createAction(MEETING_INIT, form => form);

export const getShowModal = () => async dispatch => {
    dispatch({ type: SHOW_MODAL});
    try {
        const response = await api.getOrganization();
        const res = await api.getB2enManager();
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                orgList: response.data,
                b2enList: res.data,
            }
        })
    } catch (err) {
        dispatch({
            type: SHOW_MODAL_FAILURE,
        })
    }
}

export const getShowUpdateModal = meeting => async dispatch => {
    dispatch({ type: SHOW_UPDATE_MODAL });
    try {
        const res = await api.getMeeting(meeting);
        console.log("getShowUpdateModal",res.data)
        const response = await api.getOrganization();
        const resMan = await api.getB2enManager();
        dispatch({
            type: SHOW_UPDATE_MODAL_SUCCESS,
            payload: {
                form: res.data,
                orgList: response.data,
                b2enList: resMan.data,
            }
        })
    } catch(e) {
        console.log("error");
        dispatch({
            type: SHOW_UPDATE_MODAL_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

export const handleUpdateOk = (formData) => async dispatch => {
    dispatch({ type: UPDATE_MEETING });
    try {
        await api.updateCustomer(formData);
        dispatch({
            type: UPDATE_MEETING_SUCCESS
        });
        dispatch({
            type: MEETING_INIT,
            payload: "meetingModal"
        });
        dispatch({
            type: GET_MEETING
        });
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
    } catch (e) {
        dispatch({
            type: UPDATE_MEETING_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

export const getHandleCancel = () => dispatch => {
    dispatch({ type: HANDLE_CANCEL });
    dispatch({ type: MEETING_INIT, payload: "meetingModal" });
};

export const handleOk = (formData) => async dispatch => {
    dispatch({ type: POST_MEETING });
    try {
        await api.postCustomer(formData);
        dispatch({
            type: POST_MEETING_SUCCESS
        })
        dispatch({
            type: MEETING_INIT,
            payload: "meetingModal"
        });
        dispatch({
            type: GET_MEETING
        });
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
    } catch(e) {
        dispatch({
            type: POST_MEETING_FAILURE,
            payload: e,
            error: true,
        });
        throw e;
    }
}

export const handleChangeInput = (changeData) => dispatch => {
    dispatch({ type: CHANGE_INPUT, payload: changeData });
};

const initialState = {
    updateVisible: false,
    buttonFlag: true,
    meetingModal : {
        orgNm: '',
        empNm: '',
        meetDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        meetStartTime: '',
        meetTotTime: '',
    },
    orgList: [],
    b2enList: [],
};

const meetingmodal = handleActions(
    {
        [BUTTON_CHANGE]: state => ({
            ...state,
            buttonFlag : false
        }),
        [SHOW_MODAL]: state => ({
            ...state,
            updateVisible: true,
        }),
        [SHOW_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [SHOW_MODAL_SUCCESS]: (state, { payload: { orgList, b2enList}}) =>
            produce(state, draft => {
                draft["orgList"] = orgList;
                draft['b2enList'] = b2enList;
            }),
        [SHOW_UPDATE_MODAL]: state => ({
            ...state,
            updateVisible: true,
        }),
        [SHOW_UPDATE_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [SHOW_UPDATE_MODAL_SUCCESS]: (state, { payload: { form, orgList, b2enList}}) =>
            produce(state, draft => {
                draft["orgList"] = orgList;
                draft["meetingModal"] = form;
                draft['b2enList'] = b2enList;
            }),
        [HANDLE_CANCEL]: state => ({
            ...state,
            updateVisible: false,
            buttonFlag: true,
        }),
        [CHANGE_INPUT]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                draft[form][key] = value
            }),
        [MEETING_INIT]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [POST_MEETING]: state => ({
            ...state,
            updateVisible: true,
        }),
        [POST_MEETING_SUCCESS]: state => ({
            ...state,
            updateVisible: false,
        }),
        [POST_MEETING_FAILURE]: state => ({
            ...state,
            updateVisible: false,
        }),
        [UPDATE_MEETING]: state => ({
            ...state,
            updateVisible: true,
        }),
        [UPDATE_MEETING_SUCCESS]: state => ({
            ...state,
            updateVisible: false,
        }),
        [UPDATE_MEETING_FAILURE]: state => ({
            ...state,
            updateVisible: false,
        }),
    },
    initialState,
);

export default meetingmodal