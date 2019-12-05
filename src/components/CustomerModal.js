import React from 'react';
import { Container, TextField } from '@material-ui/core/';
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {Modal} from "antd";
import { makeStyles } from '@material-ui/core/styles';

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
const CustomerModal = () => {
    return(
        <Modal
            title="고객정보 등록"
            visible={visible}
            //onOk={handleOk}
            //confirmLoading={confirmLoading}
            //onCancel={handleCancel}
            style={{ top: 25 }}
        >
            <Container component="main" maxWidth="xs">
                <form className={classes.form}>

                    <Autocomplete
                        id="orgId"
                        //options={orgList}
                        //onChange={autoCompleteHandleChange}
                        getOptionLabel={option => option.orgNm}
                        renderInput={params => (
                            <TextField
                                {...params}
                                className={classes.textField}
                                variant="outlined"
                                required
                                margin="normal"
                                label="고객명"
                                fullWidth
                            />
                        )}
                    />

                    <Autocomplete
                        id="empId"
                        //options={orgML}
                        //onChange={autoCompleteHandleChange}
                        getOptionLabel={option => option.empNm}
                        renderInput={params => (
                            <TextField
                                {...params}
                                className={classes.textField}
                                variant="outlined"
                                required
                                margin="normal"
                                label="직책"
                                fullWidth
                            />
                        )}
                    />

                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="contDt"
                        label="이메일"
                        name="LicenseNumber"
                        onChange={handleChange}
                        autoComplete="LicenseNumber"
                    />

                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="contTotAmt"
                        label="전화번호"
                        id="date"
                        //onChange={handleChange}
                        autoComplete="date"
                    />

                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="expire"
                        label="고객구분코드"
                        id="delYn"
                        //onChange={handleChange}
                        autoComplete="expire"
                    />
                </form>
            </Container>
        </Modal>
    );
}

export default CustomerModal