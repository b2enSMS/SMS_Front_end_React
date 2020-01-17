import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { ContModal } from 'components';
import { initializeForm, handleOk, handleChangeInput, getHandleCancel, getLicenseHandleDelete, gethandleUpdate } from 'modules/contract/contmodal';
import { getContList } from 'modules/contract/conttable';
import { licenseButtonChange,getShowModal,licenseUpdateHandler } from 'modules/contract/licensemodal';

const ContModalContainer = ({
    visible,
    orgList,
    managerList,
    confirmLoading,
    handleOk,
    licenses,
    contCdList,
    contForm,
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
        dispatch(initializeForm("contForm"));
    }, [dispatch])

    //const { formData } = useSelector(({ contmodal }) => ({ formData: contmodal.contForm }));

    // const okok = () => {
    //     handleOk(formData);
    // }
    const modifyLicense= (key) =>{
        licenseUpdateHandler(contForm.lcns[key],key);
    }

    return (
        <ContModal
            visible={visible}
            handleOk={()=>handleOk(contForm)}
            confirmLoading={confirmLoading}
            handleChangeInput={handleChangeInput}
            handleCancel={getHandleCancel}
            orgList={orgList}
            managerList={managerList}
            licenses={licenses}
            licenseShowModal={getShowModal}
            licenseHandleDelete={getLicenseHandleDelete}
            contCdList={contCdList}
            contForm={contForm}
            buttonFlag={buttonFlag}
            headContList={headContList}
            licenseUpdateHandler={modifyLicense}
            custList={custList}
            handleUpdate={() => gethandleUpdate(contForm)}
            licenseButtonChange={licenseButtonChange}
        />
    );
};

export default connect(
    ({ contmodal }) => ({
        custList: contmodal.custList,
        visible: contmodal.visible,
        licenses: contmodal.licenses,
        confirmLoading: contmodal.confirmLoading,
        contForm: contmodal.contForm,
        orgList: contmodal.orgList,
        managerList: contmodal.managerList,
        headContList: contmodal.headContList,
        contCdList: contmodal.contCdList,
        buttonFlag: contmodal.buttonFlag
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
)(ContModalContainer);