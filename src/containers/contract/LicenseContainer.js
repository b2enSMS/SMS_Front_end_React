import React from 'react';
import { connect, useSelector } from 'react-redux';
import { LicenseModal } from 'components';
import {handleOk, handleChangeInput,getHandleCancel } from 'modules/contract/licensemodal';

const LicenseContainer = ({
    visible,
    confirmLoading,
    handleOk,
    getHandleCancel,
    handleChangeInput,
    licenseCodeList,
    productList,

}) => {
    const {formData} = useSelector(({licensemodal})=>({formData : licensemodal.licenseForm}));

    return (
        <LicenseModal
            visible={visible}
            handleOk={()=>handleOk(formData)}
            confirmLoading={confirmLoading}
            handleChangeInput={handleChangeInput}
            handleCancel ={getHandleCancel}
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
    }
)(LicenseContainer);