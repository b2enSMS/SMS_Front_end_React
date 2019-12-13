import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { LicenseModal } from 'components';
import { handleOk, handleChangeInput, getHandleCancel } from 'modules/licensemodal';
import { inputLicense } from 'modules/contractmodal'

const LicenseContainer = ({
    visible,
    confirmLoading,
    handleOk,
    getHandleCancel,
    handleChangeInput,
    licenseCodeList,
    productList,
    inputLicense,

}) => {
    const { formData } = useSelector(({ licensemodal }) => ({ formData: licensemodal.licenseForm}));

    const dispatch = useDispatch();
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
            productList={productList}
            licenseCodeList={licenseCodeList}
        />
    );
};

export default connect(
    ({ licensemodal }) => ({
        visible: licensemodal.visible,
        licenses: licensemodal.licenses,
        confirmLoading: licensemodal.confirmLoading,
        licenseForm: licensemodal.licenseForm,
        productList: licensemodal.productList,
        licenseCodeList: licensemodal.licenseCodeList,
    }),
    {
        handleOk,
        handleChangeInput,
        getHandleCancel,
        inputLicense,
    }
)(LicenseContainer);