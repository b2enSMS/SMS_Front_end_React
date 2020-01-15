import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import  {
    getShowUpdateModal,
    getHandleCancel,
    handleChangeInput,
    handleOk,
    handleUpdateOk
} from "../../modules/customer/customermodal";
import CustomerModal from "../../components/customer/CustomerModal"


const CustomerModalContainer = ({
                                    visible,
                                         getHandleCancel,
                                         handleChangeInput,
                                    customerForm,
                                         buttonFlag,
                                         handleOk,
                                         handleUpdateOk,
                                         orgList,
                                    confirmLoading,
                                         custCdList
                                     }) => {

    const dispatch = useDispatch();

    useEffect(() => {
    },[dispatch])

    const {formData} = useSelector(({customermodal})=>({formData : customermodal.customerForm}))
    const UpdateOk = () =>{
        handleOk(formData);
    }
    return (
        <CustomerModal
            visible={visible}
            confirmLoading={confirmLoading}
            orgList={orgList}
            handleOk={UpdateOk}
            handleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            customerForm={customerForm}
            buttonFlag={buttonFlag}
            handleUpdateOk={()=>handleUpdateOk(formData)}
            custCdList={custCdList}
        />
    );
};

export default connect(
    ({ customermodal }) => ({
        confirmLoading: customermodal.confirmLoading,
        orgList: customermodal.orgList,
        buttonFlag: customermodal.buttonFlag,
        visible: customermodal.visible,
        customerForm: customermodal.customerForm,
        custCdList: customermodal.custCdList
    }),
    {
        getShowUpdateModal,
        getHandleCancel,
        handleChangeInput,
        handleOk,
        handleUpdateOk,
    }
)(CustomerModalContainer);