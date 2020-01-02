import React from 'react';
import { connect } from 'react-redux';
import { PossibleContractHistory } from 'components';
import {gethandleCancel } from 'modules/possible/possiblehistory';


const PossibleContractHistoryContainer = ({
    visible,
    gethandleCancel,
    historyList,
    loadingTable
}) => {

    return (
        <PossibleContractHistory
            visible={visible}
            historyList={historyList}
            loadingTable={loadingTable}
            handleCancel={gethandleCancel}
        />
    );
};

export default connect(
    ({ possiblehistory }) => ({
        visible: possiblehistory.visible,
        historyList: possiblehistory.historyList,
        loadingTable: possiblehistory.loadingTable,
    }),
    {
        gethandleCancel,
    }
)(PossibleContractHistoryContainer);