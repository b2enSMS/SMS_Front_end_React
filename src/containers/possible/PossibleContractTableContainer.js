import React, { useEffect } from 'react';
import { connect} from 'react-redux';
import { PossibleContractTable } from 'components';
import { getContractList,getDeleteData } from 'modules/possible/possibletable';
import { getShowModal,getUpdateModal,getButtonChange } from 'modules/possible/possiblemodal';
import { gethandleHistoryModal } from 'modules/possible/possiblehistory';
const PossibleContractTableContainer = ({
    contractList,
    getContractList,
    loadingTable,
    getShowModal,
    getDeleteData,
    getUpdateModal,
    getButtonChange,
    gethandleHistoryModal,
 }) => {

    useEffect(() => {
        getContractList();
    }, [getContractList]);

    return (
        <PossibleContractTable
            contractList={contractList}
            loadingTable={loadingTable}
            showModal={getShowModal} 
            deleteData={getDeleteData}
            updateModalHandler={getUpdateModal}
            modalBtnHandler = {getButtonChange}
            handleHistoryModal = {gethandleHistoryModal}
        />
    );
};

export default connect(
    ({ possibletable }) => ({
        contractList: possibletable.contractList,
        loadingTable: possibletable.loadingTable,
    }),
    {
        getContractList,
        getUpdateModal,
        getShowModal,
        getDeleteData,
        getButtonChange,
        gethandleHistoryModal,
    }
)(PossibleContractTableContainer);