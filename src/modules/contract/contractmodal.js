import { handleActions, createAction } from 'redux-actions';
import * as api from '../../lib/api';

const CHANGE_INPUT = 'contractmodal/CHANGE_INPUT';
const HANDLE_CANCEL = 'contractmodal/HANDLE_CANCLE';

const SHOW_MODAL = 'contractmodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'contractmodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'contractmodal/SHOW_MODAL_FAILURE';

const POST_CONTRACT = 'contractmodal/POST_CONTRACT';
const POST_CONTRACT_SUCCESS = 'contractmodal/POST_CONTRACT_SUCCESS';
const POST_CONTRACT_FAILURE = 'contractmodal/POST_CONTRACT_FAILURE';

const INSERT = 'contractmodal/INSERT';
const REMOVE = 'contractmodal/REMOVE';

export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));
let id = 0;
export const insert = createAction(INSERT, text => ({
    id: id++,
    text,
}));
export const remove = createAction(REMOVE, id => id);


export const getShowModal = () => async dispatch => {
    dispatch({ type: SHOW_MODAL });
    try {
        const response = await api.getOrganization();
        const responseML = await api.getB2enManager();
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                org: response.data,
                orgML: responseML.data
            }
        });
    } catch (e) {
        dispatch({
            type: SHOW_MODAL_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

export const getHandleCancel = () => dispatch => {
    console.log("getHandleCancel")
    dispatch({ type: HANDLE_CANCEL });
}

export const handleChangeInput = (changeData) => dispatch => {
    console.log(changeData)
    dispatch({ type: CHANGE_INPUT, payload: changeData });
}

export const handleOk = (formData) => async dispatch => {

    dispatch({ type: POST_CONTRACT });
    try {
        await api.postContracts(formData);
        dispatch({
            type: POST_CONTRACT_SUCCESS,
        });
    } catch (e) {
        dispatch({
            type: POST_CONTRACT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};


const initialState = {
    visible: false,
    confirmLoading: false,
    contractModal: {
        contDt: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
        installDt: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
        checkDt: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
        mtncStartDt: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
        mtncEndDt: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()
    },
    orgList: [],
    orgML: [],
    licenses: [],
}

const contractmodal = handleActions(
    {

        [SHOW_MODAL]: state => ({
            ...state,
            visible: true,
        }),
        [SHOW_MODAL_SUCCESS]: (state, action) => ({
            ...state,
            orgList: action.payload.org,
            orgML: action.payload.orgML
        }),

        [SHOW_MODAL_FAILURE]: (state) => ({
            ...state,
        }),

        [HANDLE_CANCEL]: state => ({
            ...state,
            visible: false,
        }),

        [CHANGE_INPUT]: (state, { payload: { form, key, value } }) => {
            const newState = Object.assign(
                {}, state
            );
            newState[form][key] = value
            //newState.visible = true
            return newState
        },
        [POST_CONTRACT]: state => ({
            ...state,
            confirmLoading: true,
        }),
        [POST_CONTRACT_SUCCESS]: (state, action) => ({
            ...state,
            confirmLoading: false,
            visible: false
        }),
        [POST_CONTRACT_FAILURE]: (state, action) => ({
            ...state,
            confirmLoading: false,
        }),


        [INSERT]:
            (state, { payload: insertLicense }) => ({
                ...state,
                licenses: state.licenses.concat(insertLicense)
            }),
        [REMOVE]:
            (state, { payload: id }) => ({
                ...state,
                licenses: state.licenses.filter(insertLicense => insertLicense.id !== id)
            }),
    },
    initialState,
);

export default contractmodal;