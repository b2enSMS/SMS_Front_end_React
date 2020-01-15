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
                                    visible,
                                    getHandleCancel,
                                    handleChangeInput,
                                    managerForm,
                                    confirmLoading,
                                    buttonFlag,
                                    handleOk,
                                    handleUpdateOk,
                                    empCd,
}) => {

    const dispatch = useDispatch();

    useEffect(() => {
    },[dispatch])

    const {formData} = useSelector(({managermodal})=>({formData : managermodal.managerForm}))
    const UpdateOk = () =>{
        handleOk(formData);
    }
    return (
        <ManagerModal
            visible={visible}
            confirmLoading={confirmLoading}
            handleOk={UpdateOk}
            handleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            managerForm={managerForm}
            buttonFlag={buttonFlag}
            empCd={empCd}
            handleUpdateOk={()=>handleUpdateOk(formData)}
        />
    );
};

export default connect(
    ({ managermodal }) => ({
        confirmLoading: managermodal.confirmLoading,
        buttonFlag: managermodal.buttonFlag,
        visible: managermodal.visible,
        managerForm: managermodal.managerForm,
        empCd:managermodal.empCd
    }),
    {
        getShowUpdateModal,
        getHandleCancel,
        handleChangeInput,
        handleOk,
        handleUpdateOk,
    }
)(ManagerModalContainer);