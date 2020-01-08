import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPossibleCustomerList, deletePossibleCustomer } from "modules/possibleCustomer/possiblecustomertable";
import PossibleCustomerTable from "../../components/possibleCustomer/PossibleCustomerTable";

const PossibleCustomerTableContainer = ({
                                   getPossibleCustomerList,
                                   deletePossibleCustomer,
                                   possibleCustomerList,
                                   loadingTable,
                               }) => {
    useEffect(()=> {
        getPossibleCustomerList();
    }, [getPossibleCustomerList]);

    return (
        <PossibleCustomerTable
            possibleCustomerList={possibleCustomerList}
            loadingTable={loadingTable}
            deleteCustomer={deletePossibleCustomer}
        />
    );
};

export default connect(
    ({ possiblecustomertable }) => ({
        possibleCustomerList: possiblecustomertable.possibleCustomerList,
        loadingTable: possiblecustomertable.loadingTable,
    }),
    {
        getPossibleCustomerList,
        deletePossibleCustomer,
    }
)(PossibleCustomerTableContainer);