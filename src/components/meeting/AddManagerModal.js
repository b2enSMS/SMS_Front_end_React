import React from 'react';
import { Container, TextField } from '@material-ui/core/';
import {Modal} from "antd";
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";


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

const AddManagerModal = ({b2enList, visible, HandleCancel, handleChangeInput, b2enModal, handleOk}) => {

    const classes = useStyles();

    const autoCompleteHandleChange = (ev, value) => {
        console.log("autoCompleteHandleChange", value)
        for (var key in value) {
            handleChangeInput({ form: "b2enModal", key: key, value: value[key] });
        }
    }

    return(
        <Modal
            title="담당자 등록"
            visible={visible}
            okText={"등록"}
            onOk={handleOk}
            onCancel={HandleCancel}
            style={{ top: 25 }}
        >
            <Container component="main" maxWidth="xs">
                <form className={classes.form} noValidate>

                    <Autocomplete
                        id="empId"
                        options={b2enList}
                        onChange={autoCompleteHandleChange}
                        getOptionLabel={option => option.empNm}
                        inputValue={b2enModal.empNm}
                        value={{ empNm: b2enModal.empNm }}
                        disableClearable={true}
                        renderInput={params => (
                            <TextField
                                {...params}
                                className={classes.textField}
                                variant="outlined"
                                required
                                //margin="normal"
                                label="담당자 명"
                                fullWidth
                                value={b2enModal.empNm}
                            />
                        )}
                    />
                    {/*<Autocomplete
                        id="empId"
                        options={b2enList}
                        onChange={autoCompleteHandleChange}
                        getOptionLabel={option => option.empNm}
                        inputValue={meetingModal.empNm}
                        value={{ empNm: meetingModal.empNm }}
                        disableClearable={true}
                        renderInput={params => (
                            <TextField
                                {...params}
                                className={classes.textField}
                                variant="outlined"
                                required
                                //margin="normal"
                                label="담당자명"
                                fullWidth
                                value={meetingModal.empNm}
                            />
                        )}
                    />*/}
                </form>
            </Container>
        </Modal>
    );
}

export default AddManagerModal;