import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrgList, deleteOrg } from "modules/organization/orgtable";
import { getShowUpdateModal, getButtonChange, getShowModal } from "modules/organization/orgmodal";
import {OrgTable} from "components";

const OrgTableContainer = ({
                                   getShowUpdateModal,
                                   getOrgList,
                                   deleteOrg,
                                   orgList,
                                   loadingTable,
                                   getShowModal,
                                   getButtonChange,
                               }) => {
    useEffect(()=> {
        getOrgList();
    }, [getOrgList]);

    return (
        <OrgTable
            orgList={orgList}
            loadingTable={loadingTable}
            deleteOrg={deleteOrg}
            showUpdateModal={getShowUpdateModal}
            showModal={getShowModal}
            changeButton={getButtonChange}
        />
    );
};

export default connect(
    ({ orgtable }) => ({
        orgList: orgtable.orgList,
        loadingTable: orgtable.loadingTable,
    }),
    {
        getOrgList,
        deleteOrg,
        getShowUpdateModal,
        getButtonChange,
        getShowModal,
    }
)(OrgTableContainer);