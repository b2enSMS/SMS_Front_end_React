import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { PossibleContModal } from 'components';
import { initializeForm, handleOk, handleChangeInput, getHandleCancel, getLicenseHandleDelete, gethandleUpdate } from 'modules/possible/possiblemodal';
import { getContList } from 'modules/possible/possibletable';
import { licenseButtonChange,getShowModal,licenseUpdateHandler } from 'modules/possible/possiblelicense';

const PossibleContModalContainer = ({
    visible,
    orgList,
    managerList,
    confirmLoading,
    handleOk,
    licenses,
    contCdList,
    possibleForm,
    buttonFlag,
    handleChangeInput,
    getHandleCancel,
    getShowModal,
    getLicenseHandleDelete,
    gethandleUpdate,
    licenseUpdateHandler,
    headContList,
    custList,
    licenseButtonChange,

}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeForm("possibleForm"));
    }, [dispatch])

    //const { formData } = useSelector(({ possiblemodal }) => ({ formData: possiblemodal.possibleForm }));

    // const okok = () => {
    //     handleOk(formData);
    // }
    const modifyLicense= (key) =>{
        licenseUpdateHandler(possibleForm.lcns[key],key);
    }

    return (
        <PossibleContModal
            visible={visible}
            handleOk={()=>handleOk(possibleForm)}
            confirmLoading={confirmLoading}
            handleChangeInput={handleChangeInput}
            handleCancel={getHandleCancel}
            orgList={orgList}
            managerList={managerList}
            licenses={licenses}
            licenseShowModal={getShowModal}
            licenseHandleDelete={getLicenseHandleDelete}
            contCdList={contCdList}
            contForm={possibleForm}
            buttonFlag={buttonFlag}
            headContList={headContList}
            licenseUpdateHandler={modifyLicense}
            custList={custList}
            handleUpdate={() => gethandleUpdate(possibleForm)}
            licenseButtonChange={licenseButtonChange}
        />
    );
};

export default connect(
    ({ possiblemodal }) => ({
        custList: possiblemodal.custList,
        visible: possiblemodal.visible,
        licenses: possiblemodal.licenses,
        confirmLoading: possiblemodal.confirmLoading,
        possibleForm: possiblemodal.possibleForm,
        orgList: possiblemodal.orgList,
        managerList: possiblemodal.managerList,
        headContList: possiblemodal.headContList,
        contCdList: possiblemodal.contCdList,
        buttonFlag: possiblemodal.buttonFlag
    }),
    {
        licenseUpdateHandler,
        handleOk,
        handleChangeInput,
        getHandleCancel,
        getContList,
        getShowModal,
        getLicenseHandleDelete,
        gethandleUpdate,
        licenseButtonChange,
    }
)(PossibleContModalContainer);