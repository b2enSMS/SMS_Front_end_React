import React, { useEffect } from 'react';
import {connect, useDispatch} from 'react-redux';
import  { ContractCustomer } from "components";
import { getShowCustomerModal } from "modules/contractcustomermodal";
import { getCustomerList, deleteCustomer } from "modules/contractcustomer";
import { getShowUpdateModal } from "modules/customerupdatemodal";

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