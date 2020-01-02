import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMeetingList , deleteMeeting } from "modules/meeting/meetingtable";
import { getShowUpdateModal, getButtonChange, getShowModal } from "modules/manager/managermodal";
import {ManagerTable} from "../../components";

const MeetingTableContainer = ({
                                   getShowUpdateModal,
                                   getMeetingList,
                                   deleteMeeting,
                                   meetingList,
                                   loadingTable,
                                   getShowModal,
                                   getButtonChange,
                               }) => {
    useEffect(()=> {
        getMeetingList();
    }, [getMeetingList]);

    return (
        <ManagerTable
            meetingList={meetingList}
            loadingTable={loadingTable}
            deleteMeeting={deleteMeeting}
            showUpdateModal={getShowUpdateModal}
            showModal={getShowModal}
            changeButton={getButtonChange}
        />
    );
};

export default connect(
    ({ meetingtable }) => ({
        meetingList: meetingtable.meetingList,
        loadingTable: meetingtable.loadingTable,
    }),
    {
        getMeetingList,
        deleteMeeting,
        getShowUpdateModal,
        getButtonChange,
        getShowModal,
    }
)(MeetingTableContainer);