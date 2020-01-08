import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    getShowUpdateModal,
    getHandleCancel,
    handleChangeInput,
    handleOk,
    handleUpdateOk
} from "modules/organization/orgmodal";
import {OrgModal} from "components";

const OrgModalContainer = ({
    visible,
    getHandleCancel,
    handleChangeInput,
    orgForm,
    buttonFlag,
    handleOk,
    handleUpdateOk,
    confirmLoading,
}) => {

    const dispatch = useDispatch();

    useEffect(() => {
    }, [dispatch])

    const { formData } = useSelector(({ orgmodal }) => ({ formData: orgmodal.orgForm }))
    const getupdateOk = () => {
        handleOk(formData);
    }
    return (
        <OrgModal
            visible={visible}
            orgForm={orgForm}
            buttonFlag={buttonFlag}
            confirmLoading={confirmLoading}
            handleOk={getupdateOk}
            handleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            handleUpdateOk={() => handleUpdateOk(formData)}
        />
    );
};

export default connect(
    ({ orgmodal }) => ({
        buttonFlag: orgmodal.buttonFlag,
        visible: orgmodal.visible,
        orgForm: orgmodal.orgForm,
        confirmLoading:orgmodal.confirmLoading,
    }),
    {
        getShowUpdateModal,
        getHandleCancel,
        handleChangeInput,
        handleOk,
        handleUpdateOk,
    }
)(OrgModalContainer);