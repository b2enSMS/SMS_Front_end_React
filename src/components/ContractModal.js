import React from 'react';
import { Modal } from 'antd';
import { Container, TextField } from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
const ContractModal = ({ visible, orgList, orgML, confirmLoading, handleOk, handleCancel, handleChangeInput }) => {
    const classes = useStyles();

    const handleChange = ev => {
        handleChangeInput({form: "contractModal", key: ev.target.id, value: ev.target.value})
    }

    const autoCompleteHandleChange = (ev, value) => {
        console.log("autoCompleteHandleChange", value)
        for(var key in value){
            console.log(key, value[key])
            handleChangeInput({form: "contractModal", key: key, value: value[key]});
        } 
    }
    return (
        <Modal
            title="계약정보 등록"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            style={{ top: 25 }}
        >
            <Container component="main" maxWidth="xs">
                <form className={classes.form}>

                    <Autocomplete
                        id="orgId"
                        options={orgList}
                        onChange={autoCompleteHandleChange}
                        getOptionLabel={option => option.orgNm}
                        renderInput={params => (
                            <TextField
                                {...params}
                                className={classes.textField}
                                variant="outlined"
                                required
                                margin="normal"
                                label="기관명"
                                fullWidth
                            />
                        )}
                    />

                    <Autocomplete
                        id="empId"
                        options={orgML}
                        onChange={autoCompleteHandleChange}
                        getOptionLabel={option => option.empNm}
                        renderInput={params => (
                            <TextField
                                {...params}
                                className={classes.textField}
                                variant="outlined"
                                required
                                margin="normal"
                                label="담당자명"
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
                        label="라이센스 번호"
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
                        label="납품일"
                        id="date"
                        onChange={handleChange}
                        autoComplete="date"
                    />

                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="expire"
                        label="유지보수 만료일"
                        id="delYn"
                        onChange={handleChange}
                        autoComplete="expire"
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="etc"
                        label="기타사항"
                        id="contReportNo"
                        onChange={handleChange}
                        autoComplete="etc"
                    />
                </form>
            </Container>
        </Modal>
    );
}
export default ContractModal;