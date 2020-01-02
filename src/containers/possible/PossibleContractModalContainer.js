import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { PossibleContractModal } from 'components';
import { initializeForm, handleOk, handleChangeInput, getHandleCancel, getRemoveLicense, gethandleUpdate } from 'modules/possible/possiblemodal';
import { getContractList } from 'modules/possible/possibletable';
import { getlicenseupdatebtn,getShowModal,getmodifyLicenseHandler } from 'modules/possible/possiblelicense';

const PossibleContractModalContainer = ({
    visible,
    orgList,
    b2enML,
    confirmLoading,
    handleOk,
    licenses,
    contCdList,
    possibleForm,
    buttonFlag,
    handleChangeInput,
    getHandleCancel,
    getShowModal,
    getRemoveLicense,
    gethandleUpdate,
    getmodifyLicenseHandler,
    headCont,
    custML,
    getlicenseupdatebtn,

}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeForm("possibleForm"));
    }, [dispatch])

    const { formData } = useSelector(({ possiblemodal }) => ({ formData: possiblemodal.possibleForm }));

    // const okok = () => {
    //     handleOk(formData);
    // }
    const modifyLicense= (key) =>{
        getmodifyLicenseHandler(formData.lcns[key],key);
    }

    return (
        <PossibleContractModal
            visible={visible}
            handleOk={()=>handleOk(formData)}
            confirmLoading={confirmLoading}
            handleChangeInput={handleChangeInput}
            handleCancel={getHandleCancel}
            orgList={orgList}
            b2enML={b2enML}
            licenses={licenses}
            licenseModalShow={getShowModal}
            removeLicenseHandler={getRemoveLicense}
            contCdList={contCdList}
            contractForm={possibleForm}
            buttonFlag={buttonFlag}
            headCont={headCont}
            modifyLicenseHandler={modifyLicense}
            custML={custML}
            handleUpdate={() => gethandleUpdate(formData)}
            licenseupdatebtn={getlicenseupdatebtn}
        />
    );
};

export default connect(
    ({ possiblemodal }) => ({
        custML: possiblemodal.custML,
        visible: possiblemodal.visible,
        licenses: possiblemodal.licenses,
        confirmLoading: possiblemodal.confirmLoading,
        possibleForm: possiblemodal.possibleForm,
        orgList: possiblemodal.orgList,
        b2enML: possiblemodal.b2enML,
        headCont: possiblemodal.headCont,
        contCdList: possiblemodal.contCdList,
        buttonFlag: possiblemodal.buttonFlag
    }),
    {
        getmodifyLicenseHandler,
        handleOk,
        handleChangeInput,
        getHandleCancel,
        getContractList,
        getShowModal,
        getRemoveLicense,
        gethandleUpdate,
        getlicenseupdatebtn,
    }
)(PossibleContractModalContainer);