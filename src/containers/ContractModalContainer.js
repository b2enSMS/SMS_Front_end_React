import React from 'react';
import { connect, useSelector } from 'react-redux';
import { ContractModal } from 'components';
import { handleOk, handleChangeInput,getHandleCancel } from 'modules/contractmodal';


const ContractModalContainer = ({
    visible,
    orgList,
    orgML,
    confirmLoading,
    handleOk,
    getHandleCancel,
    handleChangeInput }) => {
    
    const {formData} = useSelector(({contractmodal})=>({formData : contractmodal.contractModal}));
    console.log(formData);

    return (
        <ContractModal
            visible={visible}
            handleOk={()=>handleOk(formData)}
            confirmLoading={confirmLoading}
            handleChangeInput={handleChangeInput}
            handleCancel ={getHandleCancel}
            orgList={orgList}
            orgML={orgML}
        />
    );
};

export default connect(
    ({ contractmodal }) => ({
        visible: contractmodal.visible,
        confirmLoading: contractmodal.confirmLoading,
        contractModal: contractmodal.contractModal,
        orgList: contractmodal.orgList,
        orgML: contractmodal.orgML,
    }),
    {
        handleOk,
        handleChangeInput,
        getHandleCancel
       
    }
)(ContractModalContainer);