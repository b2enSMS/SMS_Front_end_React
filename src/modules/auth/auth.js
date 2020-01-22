import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as api from '../../lib/api';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const handleChangeInput = createAction(
    CHANGE_INPUT,
    ({ form, key, value }) => ({
        form,
        key,
        value,
    }),
);
export const initializeForm = createAction(INITIALIZE_FORM, form => form);

const initialState = {
    loginForm: {
        username: '',
        password: '',
    },
    auth:null,
    authError:null,
};

export const login = (username,password) => async dispatch => {
    dispatch({ type: LOGIN });
    try {
        const response = await api.login(username,password)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
}

const auth = handleActions(
    {
        [CHANGE_INPUT]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                console.log("change input",form,key,value)
                draft[form][key] = value;
            }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form]
        }),
        [LOGIN]: (state) => ({
            ...state,
        }),
        [LOGIN_SUCCESS]: (state,{payload:auth}) => ({
            ...state,
            authError:null,
            auth,
        }),
        [LOGIN_FAILURE]: (state,{payload:error}) => ({
            ...state,
            authError:error,
        }),
    },
    initialState,
);

export default auth;