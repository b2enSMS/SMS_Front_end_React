import React from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import CustomerUpdateModal from "../../components/contractCustomer/CustomerUpdateModal";
import { updateCustomer, getHandleCancel, handleChangeInput } from "../../modules/contractCustomer/customerupdatemodal";
import {getCustomerList} from "../../modules/contractCustomer/contractcustomer";

const CustomerUpdateModalContainer = ({
    updateVisible,
    orgList,
    custInfo,
    updateCustomer,
    handleChangeInput,
    getHandleCancel,
    changeInput,
}) => {

    const {formData} = useSelector(({customerupdatemodal})=>({formData : customerupdatemodal.updateCustomerModal}))
    const UpdateOk = () =>{
        console.log("formDataformData", formData);
        console.log("custIdcustId", custInfo.custId);
        updateCustomer(custInfo.custId, formData);
    }
    return (
        <CustomerUpdateModal
            updateVisible={updateVisible}
            orgList={orgList}
            handleChangeInput={handleChangeInput}
            HandleCancel={getHandleCancel}
            change={changeInput}
            updateCust={UpdateOk}
            custInfo={custInfo}
        />
    );
};

export default connect(
    ({ customerupdatemodal }) => ({
        customerInfo: customerupdatemodal.customerInfo,
        updateVisible: customerupdatemodal.updateVisible,
        updateCustomerModal: customerupdatemodal.updateCustomerModal,
        orgList: customerupdatemodal.orgList,
        custInfo: customerupdatemodal.custInfo,
}),
    {
        updateCustomer,
        getHandleCancel,
        handleChangeInput,
    }
)(CustomerUpdateModalContainer);