import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { ContractModal } from 'components';
import { initializeForm, handleOk, handleChangeInput, getHandleCancel, getRemoveLicense, gethandleUpdate } from 'modules/contract/contractmodal';
import { getContractList } from 'modules/contract/contracttable';
import { getlicenseupdatebtn,getShowModal,getmodifyLicenseHandler } from 'modules/contract/licensemodal';

const ContractModalContainer = ({
    visible,
    orgList,
    b2enML,
    confirmLoading,
    handleOk,
    licenses,
    contCdList,
    contractModal,
    buttonFlag,
    handleChangeInput,
    getHandleCancel,
    getShowModal,
    getRemoveLicense,
    gethandleUpdate,
    getmodifyLicenseHandler,
    headCont,
    custML,
    getlicenseupdatebtn,

}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeForm("contractModal"));
    }, [dispatch])

    const { formData } = useSelector(({ contractmodal }) => ({ formData: contractmodal.contractModal }));

    // const okok = () => {
    //     handleOk(formData);
    // }
    const modifyLicense= (key) =>{
        getmodifyLicenseHandler(formData.lcns[key],key);
    }

    return (
        <ContractModal
            visible={visible}
            handleOk={()=>handleOk(formData)}
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
            headCont={headCont}
            modifyLicenseHandler={modifyLicense}
            custML={custML}
            handleUpdate={() => gethandleUpdate(formData)}
            licenseupdatebtn={getlicenseupdatebtn}
        />
    );
};

export default connect(
    ({ contractmodal }) => ({
        custML: contractmodal.custML,
        visible: contractmodal.visible,
        licenses: contractmodal.licenses,
        confirmLoading: contractmodal.confirmLoading,
        contractModal: contractmodal.contractModal,
        orgList: contractmodal.orgList,
        b2enML: contractmodal.b2enML,
        headCont: contractmodal.headCont,
        contCdList: contractmodal.contCdList,
        buttonFlag: contractmodal.buttonFlag
    }),
    {
        getmodifyLicenseHandler,
        handleOk,
        handleChangeInput,
        getHandleCancel,
        getContractList,
        getShowModal,
        getRemoveLicense,
        gethandleUpdate,
        getlicenseupdatebtn,
    }
)(ContractModalContainer);