import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { PossibleContractModal } from 'components';
import { initializeForm, handleOk, handleChangeInput, getHandleCancel, getRemoveLicense, gethandleUpdate } from 'modules/possible/possiblecontractmodal';
import { getPossibleList } from 'modules/possible/possiblecontracttable';
import { getShowModal,getmodifyLicenseHandler } from 'modules/contract/licensemodal';

const PossibleContractModalContainer = ({
                                    visible,
                                    orgList,
                                    b2enML,
                                    confirmLoading,
                                    handleOk,
                                    licenses,
                                    possibleContractModal,
                                    buttonFlag,
                                    handleChangeInput,
                                    getHandleCancel,
                                    getShowModal,
                                    getRemoveLicense,
                                    gethandleUpdate,
                                    getmodifyLicenseHandler,

                                }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeForm("possibleContractModal"));
    }, [dispatch])

    const { formData } = useSelector(({ possiblecontractmodal }) => ({ formData: possiblecontractmodal.possibleContractModal }));

    // const okok = () => {
    //     handleOk(formData);
    // }
    const modifyLicense= (key) =>{
        getmodifyLicenseHandler(formData.lcns[key]);
    }

    return (
        <PossibleContractModal
            visible={visible}
            handleOk={(formData)=>handleOk(formData)}
            confirmLoading={confirmLoading}
            handleChangeInput={handleChangeInput}
            handleCancel={getHandleCancel}
            orgList={orgList}
            b2enML={b2enML}
            licenses={licenses}
            licenseModalShow={getShowModal}
            removeLicenseHandler={getRemoveLicense}
            possibleContractForm={possibleContractModal}
            buttonFlag={buttonFlag}
            modifyLicenseHandler={modifyLicense}
            handleUpdate={() => gethandleUpdate(formData)}
        />
    );
};

export default connect(
    ({ possiblecontractmodal }) => ({
        visible: possiblecontractmodal.visible,
        licenses: possiblecontractmodal.licenses,
        confirmLoading: possiblecontractmodal.confirmLoading,
        possibleContractModal: possiblecontractmodal.possibleContractModal,
        orgList: possiblecontractmodal.orgList,
        b2enML: possiblecontractmodal.b2enML,
        buttonFlag: possiblecontractmodal.buttonFlag
    }),
    {
        getmodifyLicenseHandler,
        handleOk,
        handleChangeInput,
        getHandleCancel,
        getPossibleList,
        getShowModal,
        getRemoveLicense,
        gethandleUpdate,
    }
)(PossibleContractModalContainer);