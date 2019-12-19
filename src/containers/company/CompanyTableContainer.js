import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCompanyList } from "modules/company/companytable";
import { ManagerTable } from "components"

const CompanyTableContainer = ({
        getCompanyList,
        companyList,
        loadingTable,
    }) => {
    useEffect(()=> {
        getCompanyList();
    }, [getCompanyList]);

    return (
        <ManagerTable
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