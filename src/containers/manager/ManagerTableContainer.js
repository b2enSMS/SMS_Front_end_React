import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getManagerList, deleteManager } from "modules/manager/managertable";
import { getShowUpdateModal, getButtonChange, getShowModal } from "modules/manager/managermodal";
import {ManagerTable} from "../../components";

const ManagerTableContainer = ({
                                   getShowUpdateModal,
                                   getManagerList,
                                   deleteManager,
                                   managerList,
                                   loadingTable,
                                   getShowModal,
                                   getButtonChange,
                               }) => {
    useEffect(()=> {
        getManagerList();
    }, [getManagerList]);

    return (
        <ManagerTable
            managerList={managerList}
            loadingTable={loadingTable}
            deleteManager={deleteManager}
            showUpdateModal={getShowUpdateModal}
            showModal={getShowModal}
            changeButton={getButtonChange}
        />
    );
};

export default connect(
    ({ managertable }) => ({
        managerList: managertable.managerList,
        loadingTable: managertable.loadingTable,
    }),
    {
        getManagerList,
        deleteManager,
        getShowUpdateModal,
        getButtonChange,
        getShowModal,
    }
)(ManagerTableContainer);