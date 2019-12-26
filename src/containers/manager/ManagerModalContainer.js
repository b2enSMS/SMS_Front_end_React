import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
    getShowUpdateModal,
    getHandleCancel,
    handleChangeInput,
    handleOk,
    handleUpdateOk
} from "../../modules/manager/managermodal";
import ManagerModal from "../../components/manager/ManagerModal";

const ManagerModalContainer = ({
                                         updateVisible,
                                         getHandleCancel,
                                         handleChangeInput,
                                         managerModal,
                                         buttonFlag,
                                         handleOk,
                                         handleUpdateOk
                                     }) => {

    const dispatch = useDispatch();

    useEffect(() => {
    },[dispatch])

    const {formData} = useSelector(({managermodal})=>({formData : managermodal.managerModal}))
    const UpdateOk = () =>{
        handleOk(formData);
    }
    return (
        <ManagerModal
            updateVisible={updateVisible}
            handleOk={UpdateOk}
            HandleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            managerModal={managerModal}
            buttonFlag={buttonFlag}
            handleUpdateOk={()=>handleUpdateOk(formData)}
        />
    );
};

export default connect(
    ({ managermodal }) => ({
        buttonFlag: managermodal.buttonFlag,
        updateVisible: managermodal.updateVisible,
        managerModal: managermodal.managerModal,
    }),
    {
        getShowUpdateModal,
        getHandleCancel,
        handleChangeInput,
        handleOk,
        handleUpdateOk,
    }
)(ManagerModalContainer);