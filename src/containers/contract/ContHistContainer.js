import React from 'react';
import { connect } from 'react-redux';
import { ContHist } from 'components';
import {gethandleCancel } from 'modules/contract/conthist';


const ContHistContainer = ({
    visible,
    gethandleCancel,
    histList,
    loadingTable
}) => {

    return (
        <ContHist
            visible={visible}
            histList={histList}
            loadingTable={loadingTable}
            handleCancel={gethandleCancel}
        />
    );
};

export default connect(
    ({ conthist }) => ({
        visible: conthist.visible,
        histList: conthist.histList,
        loadingTable: conthist.loadingTable,
    }),
    {
        gethandleCancel,
    }
)(ContHistContainer);