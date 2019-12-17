import React from 'react';
import { connect, useSelector,useDispatch  } from 'react-redux';
import { ContractModal } from 'components';
import {handleOk, handleChangeInput,getHandleCancel,getRemoveLicense } from 'modules/contractmodal';
import { getContractList } from 'modules/contracttable';
import { getShowModal } from 'modules/licensemodal';

const ContractModalContainer = ({
    visible,
    orgList,
    orgML,
    confirmLoading,
    handleOk,
    getHandleCancel,
    handleChangeInput,
    licenses,
    contCdList,
    getShowModal,
    getRemoveLicense
}) => {
    
    const dispatch = useDispatch();
    const {formData} = useSelector(({contractmodal})=>({formData : contractmodal.contractModal}));
    
    const okok = () =>{
        handleOk(formData);
        dispatch(getContractList())
    }

    return (
        <ContractModal
            visible={visible}
            handleOk={okok}
            confirmLoading={confirmLoading}
            handleChangeInput={handleChangeInput}
            handleCancel ={getHandleCancel}
            orgList={orgList}
            orgML={orgML}
            licenses={licenses}
            licenseModalShow={getShowModal}
            removeLicenseHandler={getRemoveLicense}
            contCdList={contCdList}
        />
    );
};

export default connect(
    ({ contractmodal }) => ({
        visible: contractmodal.visible,
        licenses: contractmodal.licenses,
        confirmLoading: contractmodal.confirmLoading,
        contractModal: contractmodal.contractModal,
        orgList: contractmodal.orgList,
        orgML: contractmodal.orgML,
        contCdList: contractmodal.contCdList,
    }),
    {
        handleOk,
        handleChangeInput,
        getHandleCancel,
        getContractList,
        getShowModal,
        getRemoveLicense
       
    }
)(ContractModalContainer);