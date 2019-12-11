import React from 'react';
import CustomerModal from "../components/CustomerModal";
import {useSelector} from "react-redux";
import { connect } from 'react-redux';
import { handleOk, handleChangeInput, getHandleCancel } from "modules/contractcustomermodal";

const CustomerModalContainer = ({
    visible,
    orgList,
    orgNameList,
    confirmLoading,
    handleOk,
    getHandleCancel,
    handleChangeInput
}) => {

    const {formData} = useSelector(({contractcustomermodal})=>({formData : contractcustomermodal.contractCustomerModal}))

    return(
        <CustomerModal
            visible={visible}
            handleOk={()=>handleOk(formData)}
            confirmLoading={confirmLoading}
            handleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            orgList={orgList}
            orgNameList={orgNameList}
        />
    );
};

export default connect(
    ({ contractcustomermodal }) => ({
        visible: contractcustomermodal.visible,
        confirmLoading: contractcustomermodal.confirmLoading,
        contractCustomerModal: contractcustomermodal.contractCustomerModal,
        orgList: contractcustomermodal.orgList,
        orgNameList: contractcustomermodal.orgNameList,
    }),
    {
        handleOk,
        handleChangeInput,
        getHandleCancel,
    }
)(CustomerModalContainer);