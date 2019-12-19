import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import  { ContractCustomer } from "components";
import { getShowCustomerModal } from "../../modules/contractCustomer/contractcustomermodal";
import { getCustomerList, deleteCustomer } from "../../modules/contractCustomer/contractcustomer";
import { getShowUpdateModal } from "../../modules/contractCustomer/customerupdatemodal";

const ContractCustomerContainer = ({
    customerList,
    getCustomerList,
    deleteCustomer,
    loadingTable,
    getShowCustomerModal,
    getShowUpdateModal,
}) => {
    useEffect(() => {
        getCustomerList();
    }, [getCustomerList]);

    return (
        <ContractCustomer
            loadingTable={loadingTable}
            customerList={customerList}
            showModal={getShowCustomerModal}
            deleteCustomer={deleteCustomer}
            showUpdateModal={getShowUpdateModal}
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
        deleteCustomer,
        getShowUpdateModal,
    }
)(ContractCustomerContainer);