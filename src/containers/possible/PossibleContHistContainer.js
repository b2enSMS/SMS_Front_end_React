import React from 'react';
import { connect } from 'react-redux';
import { PossibleContHist } from 'components';
import {gethandleCancel } from 'modules/possible/possiblehist';


const PossibleContHistContainer = ({
    visible,
    gethandleCancel,
    histList,
    loadingTable
}) => {

    return (
        <PossibleContHist
            visible={visible}
            histList={histList}
            loadingTable={loadingTable}
            handleCancel={gethandleCancel}
        />
    );
};

export default connect(
    ({ possiblehist }) => ({
        visible: possiblehist.visible,
        histList: possiblehist.histList,
        loadingTable: possiblehist.loadingTable,
    }),
    {
        gethandleCancel,
    }
)(PossibleContHistContainer);