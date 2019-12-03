import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ContractTable } from 'components';
import { getContractList } from 'modules/contracttable';
import { getShowModal } from 'modules/contractmodal';

const ContractTableContainer = ({
    contractList,
    getContractList,
    loadingTable,
    getShowModal,
 }) => {

    useEffect(() => {
        getContractList();
    }, [getContractList]);

    return (
        <ContractTable
            contractList={contractList}
            loadingTable={loadingTable}
            showModal={getShowModal} 
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
        getShowModal,
    }
)(ContractTableContainer);