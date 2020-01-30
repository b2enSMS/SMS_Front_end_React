import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { LicenseModal } from 'components';
import { gethandleUpdateCancel,getImageHandleRemove, getImageHandleChange, handleOk, handleChangeInput, getHandleCancel,getLcnsNumber } from 'modules/contract/licensemodal';
import { inputLicense,updateLicense } from 'modules/contract/contmodal'

const LicenseContainer = ({
    visible,
    lcnsBtnFlag,
    confirmLoading,
    handleOk,
    contForm,
    getHandleCancel,
    handleChangeInput,
    products,
    licCode,
    licenseForm,
    btnFlag,
    keyIndex,
    getImageHandleChange,
    getImageHandleRemove,
    gethandleUpdateCancel,
    getLcnsNumber,
}) => {
    const dispatch = useDispatch();

    //const { formData } = useSelector(({ licensemodal }) => ({ formData: licensemodal.licenseForm }));

    // useEffect(() => {
    //     dispatch(initializeForm("licenseForm"));
    // },[dispatch])


    const okok = (fileList) => {
        console.log("okok", fileList)
        getImageHandleChange(fileList);
        handleOk();
        console.log("okoklicenseForm", licenseForm)
        dispatch(inputLicense(licenseForm, fileList));
    }
    const updateOkOk = (fileList) => {
        getImageHandleChange(fileList);
        handleOk();
        dispatch(updateLicense(licenseForm,fileList, keyIndex))
    }

    return (
        <LicenseModal
            visible={visible}
            handleOk={okok}
            confirmLoading={confirmLoading}
            handleChangeInput={handleChangeInput}
            handleCancel={getHandleCancel}
            productList={products}
            licenseCodeList={licCode}
            licenseForm={licenseForm}
            imageHandleRemove={getImageHandleRemove}
            btnFlag={btnFlag}
            handleUpdateCancel={gethandleUpdateCancel}
            updateOk={updateOkOk}
            lcnsBtnFlag={lcnsBtnFlag}
            requestLcns={()=>getLcnsNumber(licenseForm.prdtNm,contForm.installDt)}
        />
    );
};

export default connect(
    ({ licensemodal,contmodal }) => ({
        visible: licensemodal.visible,
        licenses: licensemodal.licenses,
        confirmLoading: licensemodal.confirmLoading,
        licenseForm: licensemodal.licenseForm,
        products: licensemodal.products,
        licCode: licensemodal.licCode,
        btnFlag: licensemodal.btnFlag,
        keyIndex: licensemodal.keyIndex,
        lcnsBtnFlag: licensemodal.lcnsBtnFlag,
        contForm: contmodal.contForm
    }),
    {
        gethandleUpdateCancel,
        getImageHandleChange,
        getImageHandleRemove,
        handleOk,
        handleChangeInput,
        getHandleCancel,
        inputLicense,
        updateLicense,
        getLcnsNumber,
    }
)(LicenseContainer);