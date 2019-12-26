import React, { useEffect } from 'react';
import { connect} from 'react-redux';
import { getPossibleList,getDeleteData } from 'modules/possible/possiblecontracttable';
import { getShowModal,getUpdateModal,getButtonChange } from 'modules/possible/possiblecontractmodal';
import PossibleContractTable from "../../components/possible/PossibleContractTable";

const PossibleContractTableContainer = ({
                                    possibleList,
                                    getPossibleList,
                                    loadingTable,
                                    getShowModal,
                                    getDeleteData,
                                    getUpdateModal,
                                    getButtonChange,
                                }) => {

    useEffect(() => {
        getPossibleList();
    }, [getPossibleList]);

    return (
        <PossibleContractTable
            possibleList={possibleList}
            loadingTable={loadingTable}
            showModal={getShowModal}
            deleteData={getDeleteData}
            updateModalHandler={getUpdateModal}
            modalBtnHandler = {getButtonChange}
        />
    );
};

export default connect(
    ({ possiblecontracttable }) => ({
        possibleList: possiblecontracttable.possibleList,
        loadingTable: possiblecontracttable.loadingTable,
    }),
    {
        getPossibleList,
        getUpdateModal,
        getShowModal,
        getDeleteData,
        getButtonChange,
    }
)(PossibleContractTableContainer);