import React, { useEffect } from 'react';
import { connect} from 'react-redux';
import { getDeleteData, getPossibleContract } from 'modules/possible/possiblecontracttable';
import { getShowModal } from 'modules/possible/possiblecontractmodal';
import PossibleContractTable from "../../components/possible/PossibleContractTable";

const PossibleContractTableContainer = ({
                                    possibleContractList,
                                    getPossibleContract,
                                    loadingTable,
                                    getDeleteData,
                                            getShowModal,
                                }) => {

    useEffect(() => {
        getPossibleContract();
    }, [getPossibleContract]);

    return (
        <PossibleContractTable
            possibleContractList={possibleContractList}
            loadingTable={loadingTable}
            getDeleteData={getDeleteData}
            getShowModal={getShowModal}
        />
    );
};

export default connect(
    ({ possiblecontracttable }) => ({
        possibleContractList: possiblecontracttable.possibleContractList,
        loadingTable: possiblecontracttable.loadingTable,
    }),
    {
        getPossibleContract,
        getDeleteData,
        getShowModal,
    }
)(PossibleContractTableContainer);