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
        handleUpdateOk,
        prdtCd,
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
            handleCancel={getHandleCancel}
            handleChangeInput={handleChangeInput}
            productForm={productForm}
            buttonFlag={buttonFlag}
            handleUpdateOk={()=>handleUpdateOk(formData)}
            prdtCd={prdtCd}
        />
    );
};

export default connect(
    ({ productmodal }) => ({
        confirmLoading: productmodal.confirmLoading,
        buttonFlag: productmodal.buttonFlag,
        visible: productmodal.visible,
        productForm: productmodal.productForm,
        prdtCd:productmodal.prdtCd,
    }),
    {
        getShowUpdateModal,
        getHandleCancel,
        handleChangeInput,
        handleOk,
        handleUpdateOk,
    }
)(ProductModalContainer);