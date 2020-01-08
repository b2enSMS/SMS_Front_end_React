import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getContCustList, deleteContCust } from "modules/contractCustomer/contcusttable";
import { ContCust } from "components";

const ContCustContainer = ({
    getContCustList,
    deleteContCust,
    contCustList,
    loadingTable,
}) => {
    useEffect(() => {
        getContCustList();
    }, [getContCustList]);

    return (
        <ContCust
            contCustList={contCustList}
            loadingTable={loadingTable}
            deleteCustomer={deleteContCust}
        />
    );
};

export default connect(
    ({ contcusttable }) => ({
        contCustList: contcusttable.contCustList,
        loadingTable: contcusttable.loadingTable,
    }),
    {
        getContCustList,
        deleteContCust,
    }
)(ContCustContainer);