import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCompanyList, deleteCompany } from "modules/company/companytable";
import { getShowUpdateModal, getButtonChange, getShowModal } from "modules/company/companymodal";
import CompanyTable from "../../components/company/CompanyTable";

const CompanyTableContainer = ({
                                   getShowUpdateModal,
                                   getCompanyList,
                                   deleteCompany,
                                   companyList,
                                   loadingTable,
                                   getShowModal,
                                   getButtonChange,
                               }) => {
    useEffect(()=> {
        getCompanyList();
    }, [getCompanyList]);

    return (
        <CompanyTable
            companyList={companyList}
            loadingTable={loadingTable}
            deleteCompany={deleteCompany}
            showUpdateModal={getShowUpdateModal}
            showModal={getShowModal}
            changeButton={getButtonChange}
        />
    );
};

export default connect(
    ({ companytable }) => ({
        companyList: companytable.companyList,
        loadingTable: companytable.loadingTable,
    }),
    {
        getCompanyList,
        deleteCompany,
        getShowUpdateModal,
        getButtonChange,
        getShowModal,
    }
)(CompanyTableContainer);