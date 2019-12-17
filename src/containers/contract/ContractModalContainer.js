import React from 'react';
import { connect, useSelector,useDispatch  } from 'react-redux';
import { ContractModal } from 'components';
import { insert,remove,handleOk, handleChangeInput,getHandleCancel } from 'modules/contract/contractmodal';
import { getContractList } from 'modules/contract/contracttable';
import { getShowModal } from 'modules/contract/licensemodal';

const ContractModalContainer = ({
    visible,
    orgList,
    orgML,
    confirmLoading,
    handleOk,
    getHandleCancel,
    handleChangeInput,
    insert,
    remove,
    licenses,
    getShowModal
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
            onInsert={insert}
            onRemove={remove}
            licenses={licenses}
            licenseModalShow={getShowModal}
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
    }),
    {
        handleOk,
        remove,
        insert,
        handleChangeInput,
        getHandleCancel,
        getContractList,
        getShowModal
       
    }
)(ContractModalContainer);