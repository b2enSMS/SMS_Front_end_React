import React from 'react';
import { Container, TextField } from '@material-ui/core/';
import { Modal } from "antd";
import { makeStyles } from '@material-ui/core/styles';
//import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

const ManagerModal = ({ empCd,handleUpdateOk, visible, handleCancel, handleChangeInput, managerForm, buttonFlag, handleOk, confirmLoading }) => {

    const classes = useStyles();

    const handleChange = ev => {
        handleChangeInput({ form: "managerForm", key: ev.target.id, value: ev.target.value })
    }
    const empCodeHandleChange = (ev, value) => {
        handleChangeInput({ form: "managerForm", key: "empTpCd", value: value["cmmnDetailCd"] });
        handleChangeInput({ form: "managerForm", key: "empTpCdNm", value: value["cmmnDetailCdNm"] });
    }

    return (
        <Modal
            title="담당자 정보"
            visible={visible}
            confirmLoading={confirmLoading}
            okText={buttonFlag ? "등록" : "수정"}
            onOk={buttonFlag ? handleOk : handleUpdateOk}
            onCancel={handleCancel}
            cancelText="취소"
            style={{ top: 25 }}
            maskClosable={false}
        >
            <Container component="main" maxWidth="xs">
                <form className={classes.form} autoComplete="off">

                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="empNm"
                        label="이름"
                        name="empNm"
                        value={managerForm.empNm}
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
                        value={managerForm.email}
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
                        value={managerForm.telNo}
                        onChange={handleChange}
                    />
                    <Autocomplete
                        id="empTpCdId"
                        options={empCd}
                        onChange={empCodeHandleChange}
                        inputValue={managerForm.empTpCdNm}
                        value={{ cmmnDetailCdNm: managerForm.empTpCdNm }}
                        getOptionLabel={option => option.cmmnDetailCdNm}
                        disableClearable={true}
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="outlined"
                                required
                                margin="normal"
                                label="담당자 유형"
                                fullWidth
                                value={managerForm.empTpCdNm}
                            />
                        )}
                    />
                </form>
            </Container>
        </Modal>
    );
}

export default ManagerModal