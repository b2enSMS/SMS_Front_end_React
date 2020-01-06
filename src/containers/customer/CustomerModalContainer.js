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
                                         updateVisible,
                                         getHandleCancel,
                                         handleChangeInput,
                                    customerModal,
                                         buttonFlag,
                                         handleOk,
                                         handleUpdateOk,
                                         orgList,
                                         custCdList
                                     }) => {

    const dispatch = useDispatch();

    useEffect(() => {
    },[dispatch])

    const {formData} = useSelector(({customermodal})=>({formData : customermodal.customerModal}))
    const UpdateOk = () =>{
        handleOk(formData);
    }
    return (
        <CustomerModal
            updateVisible={updateVisible}
            orgList={orgList}
            handleOk={UpdateOk}
            HandleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            customerModal={customerModal}
            buttonFlag={buttonFlag}
            handleUpdateOk={()=>handleUpdateOk(formData)}
            custCdList={custCdList}
        />
    );
};

export default connect(
    ({ customermodal }) => ({
        orgList: customermodal.orgList,
        buttonFlag: customermodal.buttonFlag,
        updateVisible: customermodal.updateVisible,
        customerModal: customermodal.customerModal,
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