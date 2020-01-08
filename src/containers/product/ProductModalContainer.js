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

    const {formData} = useSelector(({productmodal})=>({formData : productmodal.productForm}))
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
    ({ productmodal }) => ({
        confirmLoading: productmodal.confirmLoading,
        buttonFlag: productmodal.buttonFlag,
        visible: productmodal.visible,
        productForm: productmodal.productForm,
    }),
    {
        getShowUpdateModal,
        getHandleCancel,
        handleChangeInput,
        handleOk,
        handleUpdateOk,
    }
)(ProductModalContainer);