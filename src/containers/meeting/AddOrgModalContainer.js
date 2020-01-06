import React from 'react';
import { connect } from 'react-redux';
// , useSelector, useDispatch
import AddOrgModal from '../../components/meeting/AddOrgModal';
import { getHandleCancel, handleChangeInput, handleOk } from "../../modules/meeting/addorgmodal";


const AddOrgModalContainer = ({
                                  visible,
                                  custModal,
                                  getHandleCancel,
                                  custList,
                                  handleChangeInput,
                                  handleOk,



}) => {
    return (
      <AddOrgModal
          visible={visible}
          custModal={custModal}
          HandleCancel={getHandleCancel}
          custList={custList}
          handleChangeInput={handleChangeInput}
          handleOk={handleOk}
      />
    );
}

export default connect(
    ({ addorgmodal }) => ({
        custModal: addorgmodal.custModal,
        visible: addorgmodal.visible,
        custList: addorgmodal.custList,
    }),{
        getHandleCancel,
        handleChangeInput,
        handleOk
    }
)(AddOrgModalContainer);