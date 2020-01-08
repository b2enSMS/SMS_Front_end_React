import React from 'react';
import { Container, TextField,InputAdornment } from '@material-ui/core/';
import {Modal} from "antd";
import { makeStyles } from '@material-ui/core/styles';
//import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(0),
    },
    // textField: {
    //     '& input:valid + fieldset': {
    //         borderWidth: 2,
    //     },
    //     '& input:invalid + fieldset': {
    //         borderWidth: 2,
    //     },
    //     '& input:valid:focus + fieldset': {
    //         borderLeftWidth: 6,
    //         padding: '4px !important', // override inline-style
    //     },
    // },
}));

const ProductModal = ({handleUpdateOk, visible, HandleCancel, confirmLoading, handleChangeInput, productForm, buttonFlag, handleOk}) => {

    const classes = useStyles();

    const handleChange = ev => {
        handleChangeInput({ form: "productForm", key: ev.target.id, value: ev.target.value })
    }

    return(
        <Modal
            title="제품 정보"
            visible={visible}
            confirmLoading={confirmLoading}
            okText={buttonFlag?"등록":"수정"}
            onOk={buttonFlag?handleOk:handleUpdateOk}
            onCancel={HandleCancel}
            style={{ top: 25 }}

        >
            <Container component="main" maxWidth="xs">
                <form className={classes.form}>

                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="prdtNm"
                        label="제품명"
                        name="prdtNm"
                        value={productForm.prdtNm}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type='number'
                        id="prdtAmt"
                        label="가격"
                        name="prdtAmt"
                        value={productForm.prdtAmt}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">원</InputAdornment>,
                        }}
                        inputProps={{
                            step: 10000,//만 원씩
                        }}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="prdtDesc"
                        label="설명"
                        id="prdtDesc"
                        value={productForm.prdtDesc}
                        onChange={handleChange}
                    />
                </form>
            </Container>
        </Modal>
    );
}

export default ProductModal