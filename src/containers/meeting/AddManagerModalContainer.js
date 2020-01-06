import React from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import { getHandleCancel, handleChangeInput, handleOk } from "../../modules/meeting/addmanagermodal";
import AddManagerModal from "../../components/meeting/AddManagerModal";
import {inputManager} from "../../modules/meeting/meetingmodal";


const AddManagerModalContainer = ({
                                  visible,
                                  b2enModal,
                                  getHandleCancel,
                                  b2enList,
                                  handleChangeInput,
                                  handleOk,



    }) => {
    const dispatch = useDispatch();
    const { formData } = useSelector(({ addmanagermodal }) => ({ formData: addmanagermodal.b2enModal }));
    const okok = () => {
        handleOk();
        dispatch(inputManager(formData));
    }
    return (
        <AddManagerModal
            visible={visible}
            b2enModal={b2enModal}
            HandleCancel={getHandleCancel}
            b2enList={b2enList}
            handleChangeInput={handleChangeInput}
            handleOk={okok}
        />
    );
}

export default connect(
    ({ addmanagermodal }) => ({
        b2enModal: addmanagermodal.b2enModal,
        visible: addmanagermodal.visible,
        b2enList: addmanagermodal.b2enList,
    }),{
        getHandleCancel,
        handleChangeInput,
        handleOk
    }
)(AddManagerModalContainer);