import React, { useEffect } from 'react';
import { connect} from 'react-redux';
import { PossibleContTable } from 'components';
import { getContList,getContDelete } from 'modules/possible/possibletable';
import { getShowModal,getUpdateModal,getButtonChange } from 'modules/possible/possiblemodal';
import { gethistShowModal } from 'modules/possible/possiblehist';
const PossibleContTableContainer = ({
    contList,
    getContList,
    loadingTable,
    getShowModal,
    getContDelete,
    getUpdateModal,
    getButtonChange,
    gethistShowModal,
 }) => {

    useEffect(() => {
        getContList();
    }, [getContList]);

    return (
        <PossibleContTable
            contList={contList}
            loadingTable={loadingTable}
            showModal={getShowModal} 
            contDelete={getContDelete}
            updateModalHandler={getUpdateModal}
            modalBtnHandler = {getButtonChange}
            histShowModal = {gethistShowModal}
        />
    );
};

export default connect(
    ({ possibletable }) => ({
        contList: possibletable.contList,
        loadingTable: possibletable.loadingTable,
    }),
    {
        getContList,
        getUpdateModal,
        getShowModal,
        getContDelete,
        getButtonChange,
        gethistShowModal,
    }
)(PossibleContTableContainer);