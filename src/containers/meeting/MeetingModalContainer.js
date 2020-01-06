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
    meetingModal,
    buttonFlag,
    handleOk,
    handleUpdateOk,
    getSelectHandleChange,
    custList,
    myComList,
}) => {

    const dispatch = useDispatch();

    useEffect(() => {
    },[dispatch])

    const {formData} = useSelector(({ meetingmodal })=>({formData : meetingmodal.meetingModal}))
    const UpdateOk = () =>{
        handleOk(formData);
    }
    return (
        <MeetingModal
            meetCd={meetCd}
            updateVisible={updateVisible}
            handleOk={UpdateOk}
            HandleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            meetingModal={meetingModal}
            buttonFlag={buttonFlag}
            handleUpdateOk={()=>handleUpdateOk(formData)}
            selectHandleChange={getSelectHandleChange}
            custList={custList}
            myComList={myComList}
        />
    );
};

export default connect(
    ({ meetingmodal }) => ({
        buttonFlag: meetingmodal.buttonFlag,
        updateVisible: meetingmodal.updateVisible,
        meetingModal: meetingmodal.meetingModal,
        meetCd: meetingmodal.meetCd,
        custList: meetingmodal.custList,
        myComList:meetingmodal.myComList,
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