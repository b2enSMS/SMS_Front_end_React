import React, { useEffect } from 'react';
import { connect} from 'react-redux';
import { ContractTable } from 'components';
import { getContractList,getDeleteData } from 'modules/contract/contracttable';
import { getShowModal,getUpdateModal,getButtonChange } from 'modules/contract/contractmodal';

const ContractTableContainer = ({
    contractList,
    getContractList,
    loadingTable,
    getShowModal,
    getDeleteData,
    getUpdateModal,
    getButtonChange,
 }) => {

    useEffect(() => {
        getContractList();
    }, [getContractList]);

    return (
        <ContractTable
            contractList={contractList}
            loadingTable={loadingTable}
            showModal={getShowModal} 
            deleteData={getDeleteData}
            updateModalHandler={getUpdateModal}
            modalBtnHandler = {getButtonChange}
        />
    );
};

export default connect(
    ({ contracttable }) => ({
        contractList: contracttable.contractList,
        loadingTable: contracttable.loadingTable,
    }),
    {
        getContractList,
        getUpdateModal,
        getShowModal,
        getDeleteData,
        getButtonChange,
    }
)(ContractTableContainer);