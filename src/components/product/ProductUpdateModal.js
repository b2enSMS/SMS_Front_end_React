import React from 'react';
import { Container, TextField } from '@material-ui/core/';
//import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {Modal} from "antd";
import { makeStyles } from '@material-ui/core/styles';
//import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(0),
    },
    textField: {
        '& input:valid + fieldset': {
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
    },
}));

const ProductUpdateModal = ({updateVisible, HandleCancel, handleChangeInput}) => {

    const classes = useStyles();

    const handleChange = ev => {
        handleChangeInput({form:"updateProductModal", key: ev.target.id, value: ev.target.value});
    }

    return(
        <Modal
            title="제품 정보 수정"
            visible={updateVisible}
            //onOk={updateCust}
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
                        name="custNm"
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="prdtVer"
                        label="버전"
                        name="custRankNm"
                        //value={custInfo.custRankNm}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="prdtAmt"
                        label="가격"
                        name="email"
                        //value={custInfo.email}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="prdtDesc"
                        label="설명"
                        id="telNo"
                        //value={custInfo.telNo}
                        onChange={handleChange}
                    />
                </form>
            </Container>
        </Modal>
    );
}

export default ProductUpdateModal