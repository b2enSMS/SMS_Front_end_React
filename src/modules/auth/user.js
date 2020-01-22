import {createAction, handleActions} from 'redux-actions';
import * as api from '../../lib/api';


const TEMP_SET_USER = 'user/TEMP_SET_USER';
const CHECK = 'user/CHECK'
const CHECK_SUCCESS = 'user/CHECK_SUCCESS'
const CHECK_FAILURE = 'user/CHECK_FAILURE'
const LOGOUT = 'user/LOGOUT'

export const tempSetUser = createAction(TEMP_SET_USER,user => user);
export const requestCheck = async dispatch =>{
    dispatch({type: CHECK});
    try{
        const response = api.loginCheck();
        dispatch({
            type: CHECK_SUCCESS,
            payload: response.data
        });
    }catch(e){
        dispatch({
            type: CHECK_FAILURE,
            payload: e,
            error: true
        })
        try{
            localStorage.removeItem('user');
        }catch(e){
            console.log('localStorage 작동 안함')
        }
    }
}
export const logout = () => async dispatch =>{
    await api.logout()
    dispatch({
        type: LOGOUT
    })
}
const initialState = {
    user:null,
    checkError: null,
};

const user = handleActions(
    {
        [LOGOUT]: (state) => ({
            ...state,
            user:null,
        }),
        [TEMP_SET_USER]: (state, {payload: user})=> ({
            ...state,
            user,
        }),
        [CHECK]: state => ({
            ...state,
        }),
        [CHECK_SUCCESS]:(state,{payload:user}) => ({
            ...state,
            user,
            checkError:null,
        }),
        [CHECK_FAILURE]: (state,{payload: error}) => ({
            ...state,
            user:null,
            checkError:error,
        }),
    },
    initialState,
);
export default user;