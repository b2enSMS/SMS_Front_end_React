import React from 'react';
import { connect, useSelector,useDispatch  } from 'react-redux';
import { ContractModal } from 'components';
import { handleOk, handleChangeInput,getHandleCancel } from 'modules/contractmodal';
import { getContractList } from 'modules/contracttable';

const ContractModalContainer = ({
    visible,
    orgList,
    orgML,
    confirmLoading,
    handleOk,
    getHandleCancel,
    handleChangeInput }) => {
    
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
        getHandleCancel,
        getContractList
       
    }
)(ContractModalContainer);