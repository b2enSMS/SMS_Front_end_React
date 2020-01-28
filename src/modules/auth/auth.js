import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as api from '../../lib/api';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

const CHECK = 'auth/CHECK'
const CHECK_SUCCESS = 'auth/CHECK_SUCCESS'
const CHECK_FAILURE = 'auth/CHECK_FAILURE'

const LOGOUT = 'auth/LOGOUT'

export const handleChangeInput = createAction(
    CHANGE_INPUT,
    ({ form, key, value }) => ({
        form,
        key,
        value,
    }),
);
export const initializeForm = createAction(INITIALIZE_FORM, form => form);

export const login = ({email,password}) => async dispatch => {
    dispatch({ type: LOGIN });
    try {
        const response = await api.login(email,password)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                auth: response.data
            }
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

export const logout = () => async dispatch => {
    //await api.logout()
    dispatch({
        type: LOGOUT
    })
    try {
        sessionStorage.removeItem('auth');
        console.log("auth 성공적으로 제거")
    } catch (e) {
        console.log('sessionStorage 작동 안함')
    }
}

export const requestCheck = () => async dispatch => {
    dispatch({ type: CHECK });
    try {
        const response = await api.loginCheck();
        console.log("check~!!!!!",response.data)
        dispatch({
            type: CHECK_SUCCESS,
            payload: {
                auth:response.data,
            }
        });
    } catch (e) {
        dispatch({
            type: CHECK_FAILURE,
            payload: e,
            error: true
        })
        try {
            sessionStorage.removeItem('auth');
        } catch (e) {
            console.log('sessionStorage 작동 안함')
        }
    }
}
const initialState = {
    loginForm: {
        email: '',
        password: '',
    },
    auth:null,
    authError:null,
};



const auth = handleActions(
    {
        [CHECK]: (state) => ({
            ...state,
        }),
        [CHECK_SUCCESS]: (state,{payload: auth}) => ({
            ...state,
            checkError: null,
            auth:auth.auth
        }),
        [CHECK_FAILURE]: (state, { payload: error }) => ({
            ...state,
            auth: null,
            checkError: error,
        }),

        [LOGOUT]: (state) => ({
            ...state,
            auth: null,
        }),
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
            auth:auth.auth
        }),
        [LOGIN_FAILURE]: (state,{payload:error}) => ({
            ...state,
            authError:error,
        }),
    },
    initialState,
);

export default auth;