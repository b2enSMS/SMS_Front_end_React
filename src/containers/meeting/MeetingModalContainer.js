import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
    getShowModal,
    getShowUpdateModal,
    getHandleCancel,
    handleChangeInput,
    handleOk,
    handleUpdateOk
} from "../../modules/meeting/meetingmodal";
import MeetingModal from "../../components/meeting/MeetingModal";

const MeetingModalContainer = ({
                                            updateVisible,
                                            getHandleCancel,
                                            handleChangeInput,
                                            meetingModal,
                                            buttonFlag,
                                            handleOk,
                                            handleUpdateOk,
                                            orgList,
                                            b2enList
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
            updateVisible={updateVisible}
            orgList={orgList}
            handleOk={UpdateOk}
            HandleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            meetingModal={meetingModal}
            buttonFlag={buttonFlag}
            handleUpdateOk={()=>handleUpdateOk(formData)}
            b2enList={b2enList}
        />
    );
};

export default connect(
    ({ meetingmodal }) => ({
        orgList: meetingmodal.orgList,
        buttonFlag: meetingmodal.buttonFlag,
        updateVisible: meetingmodal.updateVisible,
        meetingModal: meetingmodal.meetingModal,
        b2enList: meetingmodal.b2enList
    }),
    {
        getShowModal,
        getShowUpdateModal,
        getHandleCancel,
        handleChangeInput,
        handleOk,
        handleUpdateOk,
    }
)(MeetingModalContainer);