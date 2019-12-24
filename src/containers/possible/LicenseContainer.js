import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { LicenseModal } from 'components';
import { handleOk, handleChangeInput, getHandleCancel, initializeForm } from 'modules/contract/licensemodal';
import { inputLicense } from 'modules/contract/contractmodal'

const LicenseContainer = ({
    visible,
    confirmLoading,
    handleOk,
    getHandleCancel,
    handleChangeInput,
    products,
    licCode,
    licenseForm

}) => {
    const dispatch = useDispatch();
    const { formData } = useSelector(({ licensemodal }) => ({ formData: licensemodal.licenseForm}));

    useEffect(() => {
        dispatch(initializeForm("licenseForm"));
    },[dispatch])


    const okok = () => {
        handleOk();
        dispatch(inputLicense(formData));
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
            licenseForm = {licenseForm}
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
    }),
    {
        handleOk,
        handleChangeInput,
        getHandleCancel,
        inputLicense,
        initializeForm,
    }
)(LicenseContainer);