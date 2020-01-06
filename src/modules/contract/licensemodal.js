import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import * as api from '../../lib/api';
import { message } from 'antd';

const CHANGE_INPUT = 'licensemodal/CHANGE_INPUT';
const HANDLE_CANCEL = 'licensemodal/HANDLE_CANCLE';

const SHOW_LIMO = 'licensemodal/SHOW_LIMO';
const SHOW_LIMO_SUCCESS = 'licensemodal/SHOW_LIMO_SUCCESS';
const SHOW_LIMO_FAILURE = 'licensemodal/SHOW_LIMO_FAILURE';
const OFF_MODAL = 'licensemodal/OFF_MODAL';
export const INITIALIZE_FORM = 'licensemodal/INITIALIZE_FORM';

const IMAGE_CHANGE = 'licensemodal/IMAGE_CHANGE';
const MODIFY_LICENSE = 'licensemodal/MODIFY_LICENSE';
const MODIFY_LICENSE_SUCCESS = 'licensemodal/MODIFY_LICENSE_SUCCESS';
const MODIFY_LICENSE_FAILURE = 'licensemodal/MODIFY_LICENSE_FAILURE';

//const IMAGE_REMOVE = 'licensemodal/IMAGE_REMOVE'
const MODAL_IMAGE_REMOVE = 'licensemodal/MODAL_IMAGE_REMOVE'
const MODAL_IMAGE_REMOVE_SUCCESS = 'licensemodal/MODAL_IMAGE_REMOVE_SUCCESS'
const MODAL_IMAGE_REMOVE_FAILURE = 'licensemodal/MODAL_IMAGE_REMOVE_FAILURE'

const BUTTON_CHANGE = 'licensemodal/BUTTON_CHANGE'

//등록 수정 버튼 Flag
export const getlicenseupdatebtn = createAction(BUTTON_CHANGE);

//TextField값을 변경
export const changeInput = createAction(CHANGE_INPUT, ({ form, key, value }) => ({ form, key, value }));

//Form 초기화
export const initializeForm = createAction(INITIALIZE_FORM, form => form);

//이미지 변경
export const gethandleImageChange = createAction(IMAGE_CHANGE, (fileList) => ({ fileList }))

//라이센스 수정 버튼 클릭
export const getmodifyLicenseHandler = (formData, key) => async dispatch => {
    dispatch({ type: MODIFY_LICENSE })
    try {
        const responseProduct = await api.getProducts();
        const responseLicenseCode = await api.getLicenseCode();
        dispatch({
            type: MODIFY_LICENSE_SUCCESS,
            payload: {
                form: formData,
                products: responseProduct.data,
                licCode: responseLicenseCode.data,
                key: key,
            }
        })
    } catch (e) {
        dispatch({
            type: MODIFY_LICENSE_FAILURE,
            payload: e,
            error: true
        });
        throw (e);
    }
}

//이미지 옆에 휴지통 버튼 클릭
export const gethandleImageRemove = (fileList) => async dispatch => {
    console.log("gethandleImageRemove", fileList)
    dispatch({ type: MODAL_IMAGE_REMOVE })
    try {
        await api.getRemoveImage(fileList);
        message.success('이미지 삭제 성공!!');
        dispatch({
            type: MODAL_IMAGE_REMOVE_SUCCESS,
            payload: fileList
        });
    } catch (e) {
        dispatch({ type: MODAL_IMAGE_REMOVE_FAILURE })
        throw (e)
    }
};

//라이센스 등록 버튼 클릭
export const getShowModal = () => async dispatch => {
    dispatch({ type: SHOW_LIMO });
    try {
        const responseProduct = await api.getProducts();
        const responseLicenseCode = await api.getLicenseCode();
        dispatch({
            type: SHOW_LIMO_SUCCESS,
            payload: {
                products: responseProduct.data,
                licCode: responseLicenseCode.data,
            }
        });
    } catch (e) {
        dispatch({
            type: SHOW_LIMO_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

//취소 버튼 클릭
export const getHandleCancel = (fileList) => async dispatch => {
    console.log("getHandleCancel", fileList)
    dispatch({ type: MODAL_IMAGE_REMOVE })
    try {
        await api.getRemoveImage(fileList);
        dispatch({
            type: MODAL_IMAGE_REMOVE_SUCCESS,
            payload: { fileList }
        });
        dispatch({ type: HANDLE_CANCEL });
        dispatch({ type: INITIALIZE_FORM, payload: "licenseForm" });

    } catch (e) {
        dispatch({ type: MODAL_IMAGE_REMOVE_FAILURE })
        throw (e)
    }

}
//수정에서 취소 버튼 클릭
export const gethandleUpdateCancel = () => dispatch => {
    dispatch({ type: HANDLE_CANCEL });
    dispatch({ type: INITIALIZE_FORM, payload: "licenseForm" });
}

//TextField 수정
export const handleChangeInput = (changeData) => dispatch => {
    console.log(changeData)
    dispatch({ type: CHANGE_INPUT, payload: changeData });
}
//등록 버튼 클릭
export const handleOk = () => dispatch => {
    dispatch({ type: OFF_MODAL });
    dispatch({ type: INITIALIZE_FORM, payload: "licenseForm" });
};

const initialState = {
    visible: false,
    confirmLoading: false,
    licenseForm: {
        lcnsIssuDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        lcnsStartDt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        lcnsEndDt: (new Date().getFullYear() + 1) + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        prdtId: "",
        prdtNm: "",
        contAmt: "",
        lcnsNo: "",
        certNo: "",
        lcnsTpCd: "",
        lcnsTpNm: "",
        cmmnDetailCd: "",
        fileList: [],
    },
    products: [],
    licCode: [],
    tempLcnsId: null,
    imageRemoveFlag: true,
    btnFlag: true,
    keyIndex: 0,
}

const licensemodal = handleActions(
    {
        [BUTTON_CHANGE]: state => ({
            ...state,
            btnFlag: false,
        }),

        [MODIFY_LICENSE]: state => ({
            ...state,
            confirmLoading: true,
            visible: true,
        }),

        [MODIFY_LICENSE_SUCCESS]: (state, { payload: { form, products, licCode, key } }) =>
            produce(state, draft => {
                console.log("MODIFY_LICENSE_SUCCESS", form)
                draft["licCode"] = licCode
                draft["products"] = products
                draft["licenseForm"] = form
                draft["confirmLoading"] = false
                draft["keyIndex"] = key
            }),

        [MODIFY_LICENSE_FAILURE]: (state, action) => ({
            ...state,
            confirmLoading: false,
        }),


        [MODAL_IMAGE_REMOVE]: (state) => ({
            ...state,
            imageRemoveFlag: true
        }),
        [MODAL_IMAGE_REMOVE_SUCCESS]: (state, { payload: fileList }) =>

            produce(state, draft => {
                console.log("form remove before", fileList, state.licenseForm.fileList)
                if (fileList && fileList.length > 0) {
                    for (let i in fileList) {
                        draft['licenseForm']["fileList"] =  state.licenseForm.fileList.filter((v, index) => v.url !== fileList[i].url)
                    }
                }
            }),
        [MODAL_IMAGE_REMOVE_FAILURE]: state => ({
            ...state,
            imageRemoveFlag: false
        }),

        [IMAGE_CHANGE]: (state, { payload: { fileList } }) =>
            produce(state, draft => {
                console.log("moduleFile", fileList)
                draft["licenseForm"]["fileList"] = fileList
                // draft["licenseForm"]["fileList"] = state.licenseForm.fileList.concat(file)
                // draft["licenseForm"]["fileList"] = [...fileList]
            }),

        [OFF_MODAL]: state => ({
            ...state,
            visible: false,
            confirmLoading: true,
            products: [],
            licCode: [],
            btnFlag: true,
        }),
        [SHOW_LIMO]: state => ({
            ...state,
            visible: true,
            confirmLoading: false,
        }),
        [SHOW_LIMO_SUCCESS]: (state, action) => ({
            ...state,
            products: action.payload.products,
            licCode: action.payload.licCode
        }),
        [SHOW_LIMO_FAILURE]: (state) => ({
            ...state,
        }),
        [HANDLE_CANCEL]: state => ({
            ...state,
            visible: false,
            btnFlag: true,
        }),
        [CHANGE_INPUT]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                draft[form][key] = value
            }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        })
    },
    initialState,
);

export default licensemodal;