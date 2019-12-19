import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCompanyList } from "modules/company/companytable";
import CompanyTable from "../../components/company/CompanyTable";

const CompanyTableContainer = ({
        getCompanyList,
        companyList,
        loadingTable,
    }) => {
    useEffect(()=> {
        getCompanyList();
    }, [getCompanyList]);

    console.log("compancompany",companyList);
    return (
        <CompanyTable
            companyList={companyList}
            loadingTable={loadingTable}
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
    }
)(CompanyTableContainer);