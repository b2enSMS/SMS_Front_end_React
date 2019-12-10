import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import  { ContractCustomer } from "components";
import { getShowCustomerModal } from "modules/contractcustomermodal";
import { getCustomerList } from "modules/contractcustomer";

const ContractCustomerContainer = ({
    customerList,
    getCustomerList,
    loadingTable,
    getShowCustomerModal,
}) => {
    useEffect(() => {
        getCustomerList();
    }, [getCustomerList]);

    return (
        <ContractCustomer
            loadingTable={loadingTable}
            customerList={customerList}
            showModal={getShowCustomerModal}
        />
    );
};

export default connect(
    ({ contractcustomer }) => ({
        customerList: contractcustomer.customerList,
       loadingTable: contractcustomer.loadingTable,
    }),
    {
        getCustomerList,
        getShowCustomerModal,
    }
)(ContractCustomerContainer);