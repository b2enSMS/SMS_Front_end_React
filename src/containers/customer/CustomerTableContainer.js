import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCustList, deleteCustomer } from "modules/customer/customertable";
import { getShowUpdateModal, getButtonChange, getShowModal } from "modules/customer/customermodal";
import CustomerTable from "../../components/customer/CustomerTable";

const CustomerTableContainer = ({
    getShowUpdateModal,
    getCustList,
    deleteCustomer,
    customerList,
    loadingTable,
    getShowModal,
    getButtonChange,
}) => {
    useEffect(() => {
        getCustList();
    }, [getCustList]);

    return (
        <CustomerTable
            customerList={customerList}
            loadingTable={loadingTable}
            deleteCustomer={deleteCustomer}
            showUpdateModal={getShowUpdateModal}
            showModal={getShowModal}
            changeButton={getButtonChange}
        />
    );
};

export default connect(
    ({ customertable }) => ({
        customerList: customertable.customerList,
        loadingTable: customertable.loadingTable,
    }),
    {
        getCustList,
        deleteCustomer,
        getShowUpdateModal,
        getButtonChange,
        getShowModal,
    }
)(CustomerTableContainer);