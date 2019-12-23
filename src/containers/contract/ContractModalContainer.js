import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { ContractModal } from 'components';
import { gethandlePreview, gethandleImageCancel, initializeForm, handleOk, handleChangeInput, getHandleCancel, getRemoveLicense, gethandleUpdate, gethandleImageChange } from 'modules/contract/contractmodal';
import { getContractList } from 'modules/contract/contracttable';
import { getShowModal } from 'modules/contract/licensemodal';

const ContractModalContainer = ({
    visible,
    orgList,
    b2enML,
    confirmLoading,
    handleOk,
    previewVisible,
    previewImage,
    licenses,
    contCdList,
    contractModal,
    buttonFlag,
    handleChangeInput,
    getHandleCancel,
    getShowModal,
    getRemoveLicense,
    gethandleUpdate,
    gethandleImageChange,
    gethandleImageCancel,
    gethandlePreview,

}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeForm("contractModal"));
    }, [dispatch])

    const { formData } = useSelector(({ contractmodal }) => ({ formData: contractmodal.contractModal }));

    const okok = () => {
        handleOk(formData);
        // dispatch(getContractList())
    }

    return (
        <ContractModal
            visible={visible}
            handleOk={okok}
            confirmLoading={confirmLoading}
            handleChangeInput={handleChangeInput}
            handleCancel={getHandleCancel}
            orgList={orgList}
            b2enML={b2enML}
            licenses={licenses}
            licenseModalShow={getShowModal}
            removeLicenseHandler={getRemoveLicense}
            contCdList={contCdList}
            contractForm={contractModal}
            buttonFlag={buttonFlag}
            handleUpdate={() => gethandleUpdate(formData)}
            handleImageChange={gethandleImageChange}
            handleImageCancel={gethandleImageCancel}
            handlePreview={gethandlePreview}
            previewVisible= {previewVisible}
            previewImage= {previewImage}
        />
    );
};

export default connect(
    ({ contractmodal }) => ({
        previewImage: contractmodal.previewImage,
        previewVisible: contractmodal.previewVisible,
        visible: contractmodal.visible,
        licenses: contractmodal.licenses,
        confirmLoading: contractmodal.confirmLoading,
        contractModal: contractmodal.contractModal,
        orgList: contractmodal.orgList,
        b2enML: contractmodal.b2enML,
        contCdList: contractmodal.contCdList,
        buttonFlag: contractmodal.buttonFlag
    }),
    {
        gethandleImageCancel,
        gethandleImageChange,
        handleOk,
        handleChangeInput,
        getHandleCancel,
        getContractList,
        getShowModal,
        getRemoveLicense,
        gethandleUpdate,
        gethandlePreview,

    }
)(ContractModalContainer);