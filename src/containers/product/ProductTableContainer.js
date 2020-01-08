import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProductList, getDeleteProduct } from "modules/product/producttable";
import { getShowUpdateModal, getButtonChange, getShowModal } from "modules/product/productmodal";
import { ProductTable } from "components"

const ProductTableContainer = ({
    getShowUpdateModal,
    getProductList,
    getDeleteProduct,
    productList,
    loadingTable,
    getShowModal,
    getButtonChange,
}) => {
    useEffect(()=> {
        getProductList();
    }, [getProductList]);

    return (
        <ProductTable
            productList={productList}
            loadingTable={loadingTable}
            getDeleteProduct={getDeleteProduct}
            showUpdateModal={getShowUpdateModal}
            showModal={getShowModal}
            changeButton={getButtonChange}
        />
    );
};

export default connect(
    ({ producttable }) => ({
        productList: producttable.productList,
        loadingTable: producttable.loadingTable,
    }),
    {
        getProductList,
        getDeleteProduct,
        getShowUpdateModal,
        getButtonChange,
        getShowModal,
    }
)(ProductTableContainer);