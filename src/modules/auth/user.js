import {createAction, handleActions} from 'redux-actions';
import * as api from '../../lib/api';


const TEMP_SET_USER = 'user/TEMP_SET_USER';
const CHECK = 'user/CHECK'
const CHECK_SUCCESS = 'user/CHECK_SUCCESS'
const CHECK_FAILURE = 'user/CHECK_FAILURE'

export const tempSetUser = createAction(TEMP_SET_USER,user => user);
export const check = createAction(CHECK);

export const requestCheck = async dispatch =>{
    dispatch({type: CHECK});
    try{
        api.loginCheck();
        dispatch({
            type: CHECK_SUCCESS,
        });
    }catch(e){
        dispatch({
            type: CHECK_FAILURE,
            payload: e,
            error: true
        })
    }
}
const initialState = {
    user:null,
    checkError: null,
};

const user = handleActions(
    {
        [TEMP_SET_USER]: (state, {payload: user})=> ({
            ...state,
            user,
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