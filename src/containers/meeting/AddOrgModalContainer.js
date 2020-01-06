import React from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
// , useSelector, useDispatch
import AddOrgModal from '../../components/meeting/AddOrgModal';
import { getHandleCancel, handleChangeInput, handleOk } from "../../modules/meeting/addorgmodal";
import {inputCust} from "../../modules/meeting/meetingmodal";


const AddOrgModalContainer = ({
                                  visible,
                                  custModal,
                                  getHandleCancel,
                                  custList,
                                  handleChangeInput,
                                  handleOk,



}) => {
    const dispatch = useDispatch();
    const { formData } = useSelector(({ addmanagermodal }) => ({ formData: addmanagermodal.custModal }));
    const okok = () => {
        handleOk();
        dispatch(inputCust(formData));
    }
    return (
      <AddOrgModal
          visible={visible}
          custModal={custModal}
          HandleCancel={getHandleCancel}
          custList={custList}
          handleChangeInput={handleChangeInput}
          handleOk={okok}
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