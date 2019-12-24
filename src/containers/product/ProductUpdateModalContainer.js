import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
    getShowUpdateModal,
    getHandleCancel,
    handleChangeInput,
    handleOk,
    handleUpdateOk
} from "../../modules/product/productupdatemodal";
import ProductModal from "../../components/product/ProductModal";

const ProductUpdateModalContainer = ({
        updateVisible,
        prdtInfo,
        getHandleCancel,
        handleChangeInput,
        productModal,
        buttonFlag,
        handleOk,
        handleUpdateOk
    }) => {

    const dispatch = useDispatch();

    useEffect(() => {
    },[dispatch])

    const {formData} = useSelector(({productupdatemodal})=>({formData : productupdatemodal.productModal}))
    const UpdateOk = () =>{
        handleOk(formData);
    }
    return (
        <ProductModal
            updateVisible={updateVisible}
            handleOk={UpdateOk}
            prdtInfo={prdtInfo}
            HandleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            productInfo={productModal}
            buttonFlag={buttonFlag}
            handleUpdateOk={()=>handleUpdateOk(formData)}
        />
    );
};

export default connect(
    ({ productupdatemodal }) => ({
        buttonFlag: productupdatemodal.buttonFlag,
        updateVisible: productupdatemodal.updateVisible,
        productModal: productupdatemodal.productModal,
    }),
    {
        getShowUpdateModal,
        getHandleCancel,
        handleChangeInput,
        handleOk,
        handleUpdateOk,
    }
)(ProductUpdateModalContainer);