import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
    getShowModal,
    getShowUpdateModal,
    getHandleCancel,
    handleChangeInput,
    handleOk,
    handleUpdateOk,
    getSelectHandleChange,
} from "../../modules/meeting/meetingmodal";
import MeetingModal from "../../components/meeting/MeetingModal";

const MeetingModalContainer = 
({
    meetCd,
    updateVisible,
    getHandleCancel,
    handleChangeInput,
    meetingForm,
    buttonFlag,
    handleOk,
    handleUpdateOk,
    getSelectHandleChange,
    custList,
    managerList,
}) => {

    const dispatch = useDispatch();

    useEffect(() => {
    },[dispatch])

    const {formData} = useSelector(({ meetingmodal })=>({formData : meetingmodal.meetingForm}))
    const UpdateOk = () =>{
        handleOk(formData);
    }
    return (
        <MeetingModal
            meetCd={meetCd}
            updateVisible={updateVisible}
            handleOk={UpdateOk}
            handleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            meetingForm={meetingForm}
            buttonFlag={buttonFlag}
            handleUpdateOk={()=>handleUpdateOk(formData)}
            selectHandleChange={getSelectHandleChange}
            custList={custList}
            managerList={managerList}
        />
    );
};

export default connect(
    ({ meetingmodal }) => ({
        buttonFlag: meetingmodal.buttonFlag,
        updateVisible: meetingmodal.updateVisible,
        meetingForm: meetingmodal.meetingForm,
        meetCd: meetingmodal.meetCd,
        custList: meetingmodal.custList,
        managerList:meetingmodal.managerList,
    }),
    {
        getShowModal,
        getShowUpdateModal,
        getHandleCancel,
        getSelectHandleChange,
        handleChangeInput,
        handleOk,
        handleUpdateOk,
    }
)(MeetingModalContainer);