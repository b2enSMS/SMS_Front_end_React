import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getManagerList } from "modules/manager/managertable";
import { ManagerTable } from "components"

const ManagerTableContainer = ({
       getManagerList,
       managerList,
       loadingTable,
                               }) => {
    useEffect(()=> {
        getManagerList();
    }, [getManagerList]);

    return (
        <ManagerTable
            managerList={managerList}
            loadingTable={loadingTable}
        />
    );
};

export default connect(
    ({ managertable }) => ({
        managerList: managertable.managerList,
        loadingTable: managertable.loadingTable,
    }),
    {
        getManagerList,
    }
)(ManagerTableContainer);