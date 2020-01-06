import React from 'react';
import { connect } from 'react-redux';
import { getHandleCancel, handleChangeInput, handleOk } from "../../modules/meeting/addmanagermodal";
import AddManagerModal from "../../components/meeting/AddManagerModal";


const AddManagerModalContainer = ({
                                  visible,
                                      b2enModal,
                                  getHandleCancel,
                                      b2enList,
                                  handleChangeInput,
                                  handleOk,



                              }) => {
    return (
        <AddManagerModal
            visible={visible}
            b2enModal={b2enModal}
            HandleCancel={getHandleCancel}
            b2enList={b2enList}
            handleChangeInput={handleChangeInput}
            handleOk={handleOk}
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