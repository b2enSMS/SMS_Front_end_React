import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProductList, getDeleteProduct } from "modules/product/producttable";
import { getShowUpdateModal } from "modules/product/productupdatemodal";
import { ProductTable } from "components"

const ProductTableContainer = ({
    getShowUpdateModal,
    getProductList,
    getDeleteProduct,
    productList,
    loadingTable,
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
    }
)(ProductTableContainer);