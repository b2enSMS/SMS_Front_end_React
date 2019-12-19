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

const INPUT_LICENSE = 'contractmodal/INPUT_LICENSE';
// const ARRAY_INPUT = 'contractmodal/ARRAY_INPUT'

const REMOVE_LICENSE = 'contractmodal/REMOVE_LICENSE';

export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));


export const getRemoveLicense = (idx) => dispacth => {
    dispacth({
        type: REMOVE_LICENSE,
        payload: idx
    });
}


export const inputLicense = (licenseForm) => dispatch => {
    dispatch({
        type: INPUT_LICENSE,
        payload: { licenseForm }
    })
}

// export const getArrayHandleChange = (changeData) => dispatch => {
//     console.log("changeData", changeData)
//     dispatch({ type: ARRAY_INPUT, payload: changeData });
// }

export const getShowModal = () => async dispatch => {
    dispatch({ type: SHOW_MODAL });
    try {
        const response = await api.getOrganization();
        const responseML = await api.getB2enManager();
        const responseCD = await api.getcontCD();
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                org: response.data,
                orgML: responseML.data,
                contCdList: responseCD.data
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
        console.log("contractrconkafkej",formData.contTpCd)
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
        contDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        installDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        checkDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        mtncStartDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        mtncEndDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        lcns: [],
    },
    orgList: [],
    orgML: [],
    contCdList: [],
    licenses: [],
}

const contractmodal = handleActions(
    {

        [REMOVE_LICENSE]: (state,{ payload: idx }) => ({
            ...state,
            licenses: state.licenses.filter((license,index) => index !== idx),
            contractModal:{
                lcns : state.contractModal.lcns.filter((license,index) => index !== idx),
            }
        }),

        // [ARRAY_INPUT]: (state, { payload: { form, key, value, idx } }) => {
        //     console.log("-------------",form,key,value,idx,state.form.key)
        //     const newState = Object.assign(
        //         {}, state
        //     );
        //     newState[form][key]['a'] = value;
        //     return newState
        // },


        [INPUT_LICENSE]: (state, action) => {
            // ...state,
            // licenses: state.licenses.concat(action.payload),
            // contractModal: {
            //     licenseList: state.contractModal.licenseList.concat(action.payload)
            // },

            const newState = Object.assign(
                {}, state
            );
            newState["licenses"]=state.licenses.concat(action.payload)
            newState["contractModal"]["lcns"] = state.contractModal.lcns.concat(action.payload.licenseForm)
            
            return newState
            
        },

        [SHOW_MODAL]: state => ({
            ...state,
            visible: true,
        }),
        [SHOW_MODAL_SUCCESS]: (state, action) => ({
            ...state,
            orgList: action.payload.org,
            orgML: action.payload.orgML,
            contCdList: action.payload.contCdList,

            contractModal: {
                orgId: "",
                empId: "",
                contReportNo: "",
                contDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                installDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                checkDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                mtncStartDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                mtncEndDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                lcns: [],
            },
            licenses: [],
        }),

        [SHOW_MODAL_FAILURE]: (state) => ({
            ...state,
        }),

        [HANDLE_CANCEL]: state => ({
            ...state,
            visible: false,

            contractModal: {
                orgId: "",
                empId: "",
                contReportNo: "",
                contDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                installDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                checkDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                mtncStartDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                mtncEndDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
                lcns: [],
            },
            licenses: [],
        }),

        [CHANGE_INPUT]: (state, { payload: { form, key, value } }) => {
            const newState = Object.assign(
                {}, state
            );
            newState[form][key] = value
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
    },
    initialState,
);

export default contractmodal;