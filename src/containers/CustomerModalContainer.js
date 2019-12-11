import React from 'react';
import CustomerModal from "../components/CustomerModal";
import {useDispatch, useSelector} from "react-redux";
import { connect } from 'react-redux';
import { handleOk, handleChangeInput, getHandleCancel } from "modules/contractcustomermodal";
import { getCustomerList } from "../modules/contractcustomer";

const CustomerModalContainer = ({
    visible,
    orgList,
    orgNameList,
    confirmLoading,
    handleOk,
    getHandleCancel,
    handleChangeInput
}) => {

    const dispatch = useDispatch();
    const {formData} = useSelector(({contractcustomermodal})=>({formData : contractcustomermodal.contractCustomerModal}))

    const okok = () =>{
        handleOk(formData);
        dispatch(getCustomerList())
    }

    return(
        <CustomerModal
            visible={visible}
            handleOk={okok}
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