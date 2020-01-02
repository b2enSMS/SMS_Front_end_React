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

const PossibleCustomerModal = ({handleUpdateOk, orgList, custCdList, updateVisible, HandleCancel, handleChangeInput, possibleCustomerModal, buttonFlag, handleOk}) => {

    const classes = useStyles();

    const handleChange = ev => {
        handleChangeInput({ form: "possibleCustomerModal", key: ev.target.id, value: ev.target.value })
    }

    const autoCompleteHandleChange = (ev, value) => {
        console.log("autoCompleteHandleChange", value)
        for (var key in value) {
            handleChangeInput({ form: "possibleCustomerModal", key: key, value: value[key] });
        }
    }

    const contractCodeHandleChange = (ev, value)=>{
        handleChangeInput({ form: "possibleCustomerModal", key: "custTpCd", value: value["cmmnDetailCd"] });
        handleChangeInput({ form: "possibleCustomerModal", key: "custTpCdNm", value: value["cmmnDetailCdNm"] });

    }

    return(
        <Modal
            title="고객 정보"
            visible={updateVisible}
            okText={buttonFlag?"등록":"수정"}
            onOk={buttonFlag?handleOk:handleUpdateOk}
            onCancel={HandleCancel}
            style={{ top: 25 }}
        >
            <Container component="main" maxWidth="xs">
                <form className={classes.form}>
                    <Autocomplete
                        id="orgId"
                        options={orgList}
                        onChange={autoCompleteHandleChange}
                        getOptionLabel={option => option.orgNm}
                        inputValue={possibleCustomerModal.orgNm}
                        value={{ orgNm: possibleCustomerModal.orgNm }}
                        disableClearable={true}
                        renderInput={params => (
                            <TextField
                                {...params}
                                className={classes.textField}
                                variant="outlined"
                                required
                                //margin="normal"
                                label="기관명"
                                fullWidth
                                value={possibleCustomerModal.orgNm}
                            />
                        )}
                    />

                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="custNm"
                        label="고객명"
                        name="custNm"
                        value={possibleCustomerModal.custNm}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="custRankNm"
                        label="직책"
                        name="custRankNm"
                        value={possibleCustomerModal.custRankNm}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="이메일"
                        name="email"
                        value={possibleCustomerModal.email}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="telNo"
                        label="연락처"
                        id="telNo"
                        value={possibleCustomerModal.telNo}
                        onChange={handleChange}
                    />
                    <Autocomplete
                        id="custTpCd"
                        options={custCdList}
                        onChange={contractCodeHandleChange}
                        inputValue={possibleCustomerModal.custTpCdNm}
                        value={{ cmmnDetailCdNm: possibleCustomerModal.custTpCdNm }}
                        getOptionLabel={option => option.cmmnDetailCdNm}
                        renderInput={params => (
                            <TextField
                                {...params}
                                className={classes.textField}
                                variant="outlined"
                                required
                                margin="normal"
                                label="고객 코드"
                                fullWidth
                                //value={possibleCustomerModal.custTpCdNm}
                            />
                        )}
                    />
                </form>
            </Container>
        </Modal>
    );
}

export default PossibleCustomerModal