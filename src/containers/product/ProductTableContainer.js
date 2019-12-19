import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProductList } from "modules/product/producttable";
import { ProductTable } from "components"

const ProductTableContainer = ({
    getProductList,
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
    }
)(ProductTableContainer);