import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getContractCustomerList, deleteContractCustomer } from "modules/contractCustomer/contractcustomertable";
import {ContractCustomer} from "../../components";

const ContractCustomerContainer = ({
                                       getContractCustomerList,
                                       deleteContractCustomer,
                                            contractCustomerList,
                                            loadingTable,
                                        }) => {
    useEffect(()=> {
        getContractCustomerList();
    }, [getContractCustomerList]);

    return (
        <ContractCustomer
            contractCustomerList={contractCustomerList}
            loadingTable={loadingTable}
            deleteCustomer={deleteContractCustomer}
        />
    );
};

export default connect(
    ({ contractcustomertable }) => ({
        contractCustomerList: contractcustomertable.contractCustomerList,
        loadingTable: contractcustomertable.loadingTable,
    }),
    {
        getContractCustomerList,
        deleteContractCustomer,
    }
)(ContractCustomerContainer);