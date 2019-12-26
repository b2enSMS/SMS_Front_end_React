import React from 'react';
import { connect } from 'react-redux';
import { ContractHistory } from 'components';
import {gethandleCancel } from 'modules/contract/contracthistory';


const ContractHistoryContainer = ({
    visible,
    gethandleCancel,
    historyList,
    loadingTable
}) => {

    return (
        <ContractHistory
            visible={visible}
            historyList={historyList}
            loadingTable={loadingTable}
            handleCancel={gethandleCancel}
        />
    );
};

export default connect(
    ({ contracthistory }) => ({
        visible: contracthistory.visible,
        historyList: contracthistory.historyList,
        loadingTable: contracthistory.loadingTable,
    }),
    {
        gethandleCancel,
    }
)(ContractHistoryContainer);