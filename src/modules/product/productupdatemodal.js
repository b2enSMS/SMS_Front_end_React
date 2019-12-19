import { handleActions} from 'redux-actions';
import * as api from '../../lib/api';
import produce from "immer";

const HANDLE_CANCEL = "customerupdatemodal/HANHANDLE_CANCEL";
const CHANGE_INPUT = "customerupdatemodal/CHANGE_INPUT";

const SHOW_MODAL = 'customerupdatemodal/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'customerupdatemodal/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'customerupdatemodal/SHOW_MODAL_FAILURE';

export const getShowUpdateModal = product => async dispatch => {
    dispatch({ type: SHOW_MODAL });
    try {
        const res = await api.getProduct(product);
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                prdt: res.data,
            }
        })
    } catch(e) {
        console.log("error");
        dispatch({
            type: SHOW_MODAL_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

export const getHandleCancel = () => dispatch => {
    dispatch({ type: HANDLE_CANCEL });
};

export const handleChangeInput = (changeData) => dispatch => {
    dispatch({ type: CHANGE_INPUT, payload: changeData });
};

const initialState = {
    updateVisible: false,
    updateProductModal: {},
    prdtInfo: {},
};

const productupdatemodal = handleActions(
    {
        [SHOW_MODAL]: state => ({
            ...state,
            updateVisible: true,
        }),
        [SHOW_MODAL_SUCCESS]: (state, action) => ({
            ...state,
            prdtInfo: action.payload.prdt,
        }),
        [SHOW_MODAL_FAILURE]: state => ({
            ...state,
        }),
        [HANDLE_CANCEL]: state => ({
            ...state,
            updateVisible: false,
        }),
        [CHANGE_INPUT]: (state, { payload: { form, key, value}}) =>
            produce(state, draft => {
                draft[form][key] =value;
        }),
    },
    initialState,
);

export default productupdatemodal