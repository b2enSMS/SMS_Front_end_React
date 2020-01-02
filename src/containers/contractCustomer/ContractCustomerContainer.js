import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getContractCustomerList, deleteContractCustomer } from "modules/contractCustomer/contractcustomertable";
import { getShowUpdateModal, getButtonChange, getShowModal } from "modules/possibleCustomer/possiblecustomermodal";
import {ContractCustomer} from "../../components";

const ContractCustomerContainer = ({
                                            getShowUpdateModal,
                                       getContractCustomerList,
                                       deleteContractCustomer,
                                            contractCustomerList,
                                            loadingTable,
                                            getShowModal,
                                            getButtonChange,
                                        }) => {
    useEffect(()=> {
        getContractCustomerList();
    }, [getContractCustomerList]);

    return (
        <ContractCustomer
            contractCustomerList={contractCustomerList}
            loadingTable={loadingTable}
            deleteCustomer={deleteContractCustomer}
            showUpdateModal={getShowUpdateModal}
            showModal={getShowModal}
            changeButton={getButtonChange}
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
        getShowUpdateModal,
        getButtonChange,
        getShowModal,
    }
)(ContractCustomerContainer);