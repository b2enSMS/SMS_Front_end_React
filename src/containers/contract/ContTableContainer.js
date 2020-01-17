import React, { useEffect } from 'react';
import { connect} from 'react-redux';
import { ContTable } from 'components';
import { getContList,getContDelete,getFilterHandler } from 'modules/contract/conttable';
import { getShowModal,getUpdateModal,getButtonChange } from 'modules/contract/contmodal';
import { gethistShowModal } from 'modules/contract/conthist';
const ContTableContainer = ({
    contList,
    getContList,
    loadingTable,
    getShowModal,
    getContDelete,
    getUpdateModal,
    getButtonChange,
    gethistShowModal,
    getFilterHandler,
 }) => {

    useEffect(() => {
        getContList();
    }, [getContList]);

    return (
        <ContTable
            contList={contList}
            loadingTable={loadingTable}
            showModal={getShowModal} 
            contDelete={getContDelete}
            updateModalHandler={getUpdateModal}
            modalBtnHandler = {getButtonChange}
            histShowModal = {gethistShowModal}
            filterHandler = {getFilterHandler}
        />
    );
};

export default connect(
    ({ conttable }) => ({
        contList: conttable.contList,
        loadingTable: conttable.loadingTable,
    }),
    {
        getFilterHandler,
        getContList,
        getUpdateModal,
        getShowModal,
        getContDelete,
        getButtonChange,
        gethistShowModal,
    }
)(ContTableContainer);