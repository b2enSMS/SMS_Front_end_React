import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
    getShowUpdateModal,
    getHandleCancel,
    handleChangeInput,
    handleOk,
    handleUpdateOk
} from "../../modules/product/productmodal";
import ProductModal from "../../components/product/ProductModal";

const ProductModalContainer = ({
                                         visible,
        getHandleCancel,
        handleChangeInput,
                                         productForm,
                                         confirmLoading,
        buttonFlag,
        handleOk,
        handleUpdateOk
    }) => {

    const dispatch = useDispatch();

    useEffect(() => {
    },[dispatch])

    const {formData} = useSelector(({productupdatemodal})=>({formData : productupdatemodal.productForm}))
    const UpdateOk = () =>{
        handleOk(formData);
    }
    return (
        <ProductModal
            confirmLoading={confirmLoading}
            visible={visible}
            handleOk={UpdateOk}
            HandleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            productForm={productForm}
            buttonFlag={buttonFlag}
            handleUpdateOk={()=>handleUpdateOk(formData)}
        />
    );
};

export default connect(
    ({ productupdatemodal }) => ({
        confirmLoading: productupdatemodal.confirmLoading,
        buttonFlag: productupdatemodal.buttonFlag,
        visible: productupdatemodal.visible,
        productForm: productupdatemodal.productForm,
    }),
    {
        getShowUpdateModal,
        getHandleCancel,
        handleChangeInput,
        handleOk,
        handleUpdateOk,
    }
)(ProductModalContainer);