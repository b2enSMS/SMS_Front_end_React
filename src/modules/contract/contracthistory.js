import { handleActions,createAction} from 'redux-actions';
import * as api from '../../lib/api';
// import produce from 'immer';

const SHOW_MODAL = 'contracthistory/SHOW_MODAL';
const SHOW_MODAL_SUCCESS = 'contracthistory/SHOW_MODAL_SUCCESS';
const SHOW_MODAL_FAILURE = 'contracthistory/SHOW_MODAL_FAILURE';

const MODAL_CANCEL = 'contracthistory/MODAL_CANCEL'

export const gethandleCancel = createAction(MODAL_CANCEL);


export const gethandleHistoryModal = (contId) => async dispatch => {
    dispatch({ type: SHOW_MODAL });
    try {
        const response = await api.getHistoryList(contId)
        dispatch({
            type: SHOW_MODAL_SUCCESS,
            payload: {
                historyList: response.data
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
}


const initialState = {
    visible: false,
    loadingTable: false,
    historyList: [],
}

const contracthistory = handleActions(
    {
        [SHOW_MODAL]: state => ({
            ...state,
            visible: true,
            loadingTable: true,
        }),
        [SHOW_MODAL_SUCCESS]: (state, action) => ({
            ...state,
            historyList:action.payload.historyList,
            loadingTable: false,
        }),

        [SHOW_MODAL_FAILURE]: (state) => ({
            ...state,
            loadingTable: false,
        }),

        [MODAL_CANCEL]: (state) => ({
            ...state,
            visible: false,
        })
    },
    initialState,
);

export default contracthistory;
