import React, { useEffect } from 'react';
import { connect} from 'react-redux';
import { ContractTable } from 'components';
import { getContractList,getDeleteData } from 'modules/contracttable';
import { getShowModal } from 'modules/contractmodal';

const ContractTableContainer = ({
    contractList,
    getContractList,
    loadingTable,
    getShowModal,
    getOnSelectChange,
    getDeleteData,
 }) => {

    useEffect(() => {
        getContractList();
    }, [getContractList]);

    return (
        <ContractTable
            contractList={contractList}
            loadingTable={loadingTable}
            showModal={getShowModal} 
            onSelectChange={getOnSelectChange}
            deleteData={getDeleteData}
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
        getDeleteData,
    }
)(ContractTableContainer);