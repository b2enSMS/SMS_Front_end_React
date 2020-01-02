import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
    getShowUpdateModal,
    getHandleCancel,
    handleChangeInput,
    handleOk,
    handleUpdateOk
} from "../../modules/company/companymodal";
import CompanyModal from "../../components/company/CompanyModal";

const CompanyModalContainer = ({
                                         updateVisible,
                                         getHandleCancel,
                                         handleChangeInput,
                                         companyModal,
                                         buttonFlag,
                                         handleOk,
                                         handleUpdateOk
                                     }) => {

    const dispatch = useDispatch();

    useEffect(() => {
    },[dispatch])

    const {formData} = useSelector(({companymodal})=>({formData : companymodal.companyModal}))
    const UpdateOk = () =>{
        handleOk(formData);
    }
    return (
        <CompanyModal
            updateVisible={updateVisible}
            handleOk={UpdateOk}
            HandleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            companyModal={companyModal}
            buttonFlag={buttonFlag}
            handleUpdateOk={()=>handleUpdateOk(formData)}
        />
    );
};

export default connect(
    ({ companymodal }) => ({
        buttonFlag: companymodal.buttonFlag,
        updateVisible: companymodal.updateVisible,
        companyModal: companymodal.companyModal,
    }),
    {
        getShowUpdateModal,
        getHandleCancel,
        handleChangeInput,
        handleOk,
        handleUpdateOk,
    }
)(CompanyModalContainer);