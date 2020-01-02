import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPossibleCustomerList, deletePossibleCustomer } from "modules/possibleCustomer/possiblecustomertable";
import { getShowUpdateModal, getButtonChange, getShowModal } from "modules/possibleCustomer/possiblecustomermodal";
import PossibleCustomerTable from "../../components/possibleCustomer/PossibleCustomerTable";

const PossibleCustomerTableContainer = ({
                                   getShowUpdateModal,
                                   getPossibleCustomerList,
                                   deletePossibleCustomer,
                                   possibleCustomerList,
                                   loadingTable,
                                   getShowModal,
                                   getButtonChange,
                               }) => {
    useEffect(()=> {
        getPossibleCustomerList();
    }, [getPossibleCustomerList]);

    return (
        <PossibleCustomerTable
            possibleCustomerList={possibleCustomerList}
            loadingTable={loadingTable}
            deleteCustomer={deletePossibleCustomer}
            showUpdateModal={getShowUpdateModal}
            showModal={getShowModal}
            changeButton={getButtonChange}
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
        getShowUpdateModal,
        getButtonChange,
        getShowModal,
    }
)(PossibleCustomerTableContainer);