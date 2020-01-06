import {createAction, handleActions} from 'redux-actions';
import * as api from '../../lib/api';
import produce from 'immer';

const INIT_MANAGER = 'addmanagermodal/INIT_MANAGER';

const SHOW_B2EN_MODAL = 'addmanagermodal/SHOW_B2EN_MODAL';
const SHOW_B2EN_MODAL_SUCCESS = 'addmanagermodal/SHOW_B2EN_MODAL_SUCCESS';
const SHOW_B2EN_MODAL_FAILURE = 'addmanagermodal/SHOW_B2EN_MODAL_FAILURE';

const HANDLE_CANCEL = 'addmanagermodal/HANDLE_CANCEL';
const CHANGE_INPUT = 'addmanagermodal/CHANGE_INPUT';
const HANDLE_OK = 'addmanagermodal/HANDLE_OK';

export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
export const initialForm = createAction(INIT_MANAGER, form => form);

export const getShowEmpModal = () => async dispatch => {
    dispatch({ type: SHOW_B2EN_MODAL });
    try {
        const res = await api.getB2enManager();
        dispatch({
            type: SHOW_B2EN_MODAL_SUCCESS,
            payload: {
                b2enList: res.data,
            }
        })
    } catch (e) {
        dispatch({
            type: SHOW_B2EN_MODAL_FAILURE,
            error: true
        });
        throw e;
    }
};

export const getHandleCancel = () => dispatch => {
    dispatch({ type: HANDLE_CANCEL });
    dispatch({ type: INIT_MANAGER, payload: "b2enModal"});
};

export const handleChangeInput = (changeData) => dispatch => {
    dispatch({
        type: CHANGE_INPUT,
        payload: changeData,
    })
};

export const handleOk = () => dispatch => {
    dispatch({ type: HANDLE_OK });
    dispatch({ type: INIT_MANAGER, payload: "b2enModal"});
}

const initialState = {
    visible: false,
    b2enModal: {
        empNm :'',
    },
    b2enList: [],
};

const addmanagermodal = handleActions(
    {
        [SHOW_B2EN_MODAL]: state => ({
            ...state,
            visible: true,
        }),
        [SHOW_B2EN_MODAL_SUCCESS]: (state, action) => ({
            ...state,
            b2enList: action.payload.b2enList
        }),
        [SHOW_B2EN_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [HANDLE_CANCEL]: state => ({
            ...state,
            visible: false,
        }),
        [CHANGE_INPUT]: (state, {payload: {form, key, value}}) =>
            produce(state, draft => {
                draft[form][key] = value
            }),
        [HANDLE_OK]: state => ({
            ...state,
            visible: false,
        }),
        [INIT_MANAGER]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
    },
    initialState,
)

export default addmanagermodal;
