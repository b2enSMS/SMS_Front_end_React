import React from 'react';
import { Container, TextField } from '@material-ui/core/';
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

const ManagerModal = ({handleUpdateOk, updateVisible, HandleCancel, handleChangeInput, managerModal, buttonFlag, handleOk}) => {

    const classes = useStyles();

    const handleChange = ev => {
        handleChangeInput({ form: "managerModal", key: ev.target.id, value: ev.target.value })
    }

    return(
        <Modal
            title="제품 정보"
            visible={updateVisible}
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
                        id="empNm"
                        label="이름"
                        name="empNm"
                        value={managerModal.empNm}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="email"
                        name="email"
                        value={managerModal.email}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="telNo"
                        label="번호"
                        id="telNo"
                        value={managerModal.telNo}
                        onChange={handleChange}
                    />
                </form>
            </Container>
        </Modal>
    );
}

export default ManagerModal