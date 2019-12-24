import React, { useEffect } from 'react';
import { connect, useSelector,useDispatch  } from 'react-redux';
import {initializeForm,handleOk, handleChangeInput,getHandleCancel,getRemoveLicense,gethandleUpdate } from 'modules/possible/possiblecontractmodal';
import { getPossibleContract } from 'modules/possible/possiblecontracttable'
import { getShowModal } from 'modules/possible/licensemodal';
import PossibleContractModal from "../../components/possible/PossibleContractModal";

const PossibleContractModalContainer = ({
    visible,
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
    },[dispatch])

    const {formData} = useSelector(({possiblecontractmodal})=>({formData : possiblecontractmodal.contractModal}));


    return (
        <PossibleContractModal
            visible={visible}
        />
    );
};

export default connect(
    ({ possiblecontractmodal }) => ({
        visible: possiblecontractmodal.visible,
    }),
    {
       
    }
)(PossibleContractModalContainer);