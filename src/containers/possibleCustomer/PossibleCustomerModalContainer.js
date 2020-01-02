import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
    getShowUpdateModal,
    getHandleCancel,
    handleChangeInput,
    handleOk,
    handleUpdateOk
} from "../../modules/possibleCustomer/possiblecustomermodal";
import PossibleCustomerModal from "../../components/possibleCustomer/PossibleCustomerModal";

const PossibleCustomerModalContainer = ({
                                         updateVisible,
                                         getHandleCancel,
                                         handleChangeInput,
                                         possibleCustomerModal,
                                         buttonFlag,
                                         handleOk,
                                         handleUpdateOk,
                                         orgList,
                                         custCdList
                                     }) => {

    const dispatch = useDispatch();

    useEffect(() => {
    },[dispatch])

    const {formData} = useSelector(({possiblecustomermodal})=>({formData : possiblecustomermodal.possibleCustomerModal}))
    const UpdateOk = () =>{
        handleOk(formData);
    }
    return (
        <PossibleCustomerModal
            updateVisible={updateVisible}
            orgList={orgList}
            handleOk={UpdateOk}
            HandleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            possibleCustomerModal={possibleCustomerModal}
            buttonFlag={buttonFlag}
            handleUpdateOk={()=>handleUpdateOk(formData)}
            custCdList={custCdList}
        />
    );
};

export default connect(
    ({ possiblecustomermodal }) => ({
        orgList: possiblecustomermodal.orgList,
        buttonFlag: possiblecustomermodal.buttonFlag,
        updateVisible: possiblecustomermodal.updateVisible,
        possibleCustomerModal: possiblecustomermodal.possibleCustomerModal,
        custCdList: possiblecustomermodal.custCdList
    }),
    {
        getShowUpdateModal,
        getHandleCancel,
        handleChangeInput,
        handleOk,
        handleUpdateOk,
    }
)(PossibleCustomerModalContainer);