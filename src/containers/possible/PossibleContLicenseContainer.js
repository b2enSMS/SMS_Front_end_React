import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { PossibleContLicense } from 'components';
import { gethandleUpdateCancel, handleOk, handleChangeInput, getHandleCancel } from 'modules/possible/possiblelicense';
import { inputLicense,updateLicense } from 'modules/possible/possiblemodal'

const PossibleContLicenseContainer = ({
    visible,
    confirmLoading,
    handleOk,
    getHandleCancel,
    handleChangeInput,
    products,
    licCode,
    licenseForm,
    btnFlag,
    keyIndex,
    gethandleUpdateCancel,
}) => {
    const dispatch = useDispatch();

    //const { formData } = useSelector(({ possiblelicense }) => ({ formData: possiblelicense.licenseForm }));

    const okok = () => {
        handleOk();
        dispatch(inputLicense(licenseForm));
    }
    const updateOkOk = () => {
        handleOk();
        dispatch(updateLicense(licenseForm,keyIndex))
    }

    return (
        <PossibleContLicense
            visible={visible}
            handleOk={okok}
            confirmLoading={confirmLoading}
            handleChangeInput={handleChangeInput}
            handleCancel={getHandleCancel}
            productList={products}
            licenseCodeList={licCode}
            licenseForm={licenseForm}
            btnFlag={btnFlag}
            handleUpdateCancel={gethandleUpdateCancel}
            updateOk={updateOkOk}
        />
    );
};

export default connect(
    ({ possiblelicense }) => ({
        visible: possiblelicense.visible,
        licenses: possiblelicense.licenses,
        confirmLoading: possiblelicense.confirmLoading,
        licenseForm: possiblelicense.licenseForm,
        products: possiblelicense.products,
        licCode: possiblelicense.licCode,
        imageRemoveFlag: possiblelicense.imageRemoveFlag,
        btnFlag: possiblelicense.btnFlag,
        keyIndex: possiblelicense.keyIndex,
    }),
    {
        gethandleUpdateCancel,
        handleOk,
        handleChangeInput,
        getHandleCancel,
        inputLicense,
        updateLicense,
    }
)(PossibleContLicenseContainer);