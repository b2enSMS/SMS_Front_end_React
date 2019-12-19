import React from 'react';
import {connect} from 'react-redux';
import { getShowUpdateModal, getHandleCancel, handleChangeInput } from "../../modules/product/productupdatemodal";
import ProductUpdateModal from "../../components/product/ProductUpdateModal";

const ProductUpdateModalContainer = ({
        updateVisible,
        prdtInfo,
        getHandleCancel,
        handleChangeInput,
    }) => {

    /*const dispatch = useDispatch();
    //const {formData} = useSelector(({productupdatemodal})=>({formData : productupdatemodal.updateCustomerModal}))
    const UpdateOk = () =>{
        //updateCustomer(custInfo.custId, formData);
        //dispatch(getCustomerList());
    }*/
    return (
        <ProductUpdateModal
            updateVisible={updateVisible}
            prdtInfo={prdtInfo}
            HandleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
        />
    );
};

export default connect(
    ({ productupdatemodal }) => ({
        prdtInfo: productupdatemodal.prdtInfo,
        updateVisible: productupdatemodal.updateVisible,
        updateProductModal: productupdatemodal.updateProductModal,
    }),
    {
        getShowUpdateModal,
        getHandleCancel,
        handleChangeInput
    }
)(ProductUpdateModalContainer);