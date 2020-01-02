import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { LicenseModal } from 'components';
import { gethandleUpdateCancel,gethandleImageRemove, gethandleImageChange, handleOk, handleChangeInput, getHandleCancel } from 'modules/contract/licensemodal';
import { inputLicense,updateLicense } from 'modules/contract/contractmodal'

const LicenseContainer = ({
    visible,
    confirmLoading,
    handleOk,
    getHandleCancel,
    handleChangeInput,
    products,
    licCode,
    licenseForm,
    imageRemoveFlag,
    btnFlag,
    keyIndex,
    gethandleImageChange,
    gethandleImageRemove,
    gethandleUpdateCancel,
}) => {
    const dispatch = useDispatch();

    const { formData } = useSelector(({ licensemodal }) => ({ formData: licensemodal.licenseForm }));

    // useEffect(() => {
    //     dispatch(initializeForm("licenseForm"));
    // },[dispatch])


    const okok = (fileList) => {
        console.log("okok", fileList)
        gethandleImageChange(fileList);
        handleOk();
        console.log("okokformData", formData)
        dispatch(inputLicense(formData, fileList));
    }
    const updateOkOk = (fileList) => {
        gethandleImageChange(fileList);
        handleOk();
        dispatch(updateLicense(formData,fileList, keyIndex))
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
            handleImageRemove={gethandleImageRemove}
            handleImageChange={gethandleImageChange}
            imageRemoveFlag={imageRemoveFlag}
            btnFlag={btnFlag}
            handleUpdateCancel={gethandleUpdateCancel}
            updateOk={updateOkOk}
        />
    );
};

export default connect(
    ({ licensemodal }) => ({
        visible: licensemodal.visible,
        licenses: licensemodal.licenses,
        confirmLoading: licensemodal.confirmLoading,
        licenseForm: licensemodal.licenseForm,
        products: licensemodal.products,
        licCode: licensemodal.licCode,
        imageRemoveFlag: licensemodal.imageRemoveFlag,
        btnFlag: licensemodal.btnFlag,
        keyIndex: licensemodal.keyIndex,
    }),
    {
        gethandleUpdateCancel,
        gethandleImageChange,
        gethandleImageRemove,
        handleOk,
        handleChangeInput,
        getHandleCancel,
        inputLicense,
        updateLicense,
    }
)(LicenseContainer);