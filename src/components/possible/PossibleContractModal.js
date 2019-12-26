import React from 'react';
import { Modal } from 'antd';
import { Container, TextField, Grid, Button, Input } from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import 'lib/css/ant.css';

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
    textInput: {
        paddingTop: theme.spacing(2),
    },
    inputButton: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(-6)
    },
    delButton: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(-2)
    },
    dynamicSpan: {
        width: '100%',
    },
    textDate: {

    },
    prdtBtn: {
        marginTop: theme.spacing(3.5)
    },


}));

const PossibleContractModal = ({ modifyLicenseHandler, handleUpdate, buttonFlag, licenseModalShow, visible, orgList, b2enML, confirmLoading, handleOk, handleCancel, handleChangeInput, licenses, removeLicenseHandler, possibleContractForm }) => {
    const classes = useStyles();
    const handleChange = ev => {
        handleChangeInput({ form: "possibleContractModal", key: ev.target.id, value: ev.target.value })
    }

    const autoCompleteHandleChange = (ev, value) => {
        console.log("autoCompleteHandleChange", value)
        for (var key in value) {
            handleChangeInput({ form: "possibleContractModal", key: key, value: value[key] });
        }
    }

    // const lcnsInputHandleChange = ev => {
    //     console.log("lcnsInputHandleChange", ev);
    //     console.log("name, hidden", ev.target.value, ev.target.hidden, ev.target.id, ev.target.value);
    //     inputPriceChange({ form: "contractModal", key: "contAmt", idx: ev.target.id, value: ev.target.value })
    // }

    return (
        <Modal

            title="임시 계약 정보"
            visible={visible}
            onOk={buttonFlag ? handleOk : handleUpdate}
            okText={buttonFlag ? "등록" : "수정"}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            cancelText="취소"
            style={{ top: 35 }}
            width="40%"
            maskClosable={false}
        >
            {console.log("dfjefe", buttonFlag)}
            <Container component="main" fixed>
                <form className={classes.form} autoComplete="off">
                            <Autocomplete
                                id="orgId"
                                options={orgList}
                                onChange={autoCompleteHandleChange}
                                getOptionLabel={option => option.orgNm}
                                inputValue={possibleContractForm.orgNm}
                                value={{ orgNm: possibleContractForm.orgNm }}
                                disableClearable={true}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                        margin="normal"
                                        label="기관명"
                                        fullWidth
                                        value={possibleContractForm.orgNm}
                                    />
                                )}
                            />
                            <Autocomplete
                                id="empId"
                                options={b2enML}
                                onChange={autoCompleteHandleChange}
                                getOptionLabel={option => option.empNm}
                                inputValue={possibleContractForm.empNm}
                                value={{ empNm: possibleContractForm.empNm }}
                                disableClearable={true}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                        margin="normal"
                                        label="담당자명"
                                        fullWidth
                                        value={possibleContractForm.empNm}
                                    />
                                )}
                            />
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="macAddr"
                                label="mac 주소"
                                id="macAddr"
                                onChange={handleChange}
                                autoComplete="off"
                                value={possibleContractForm.macAddr}
                            />

                            <Button size="large"
                                    className={classes.prdtBtn}
                                    onClick={licenseModalShow}
                                    variant="outlined">제품 등록
                            </Button>
                </form>

                {possibleContractForm.lcns.map((license, index) => (

                    <LicenseItem

                        license={license}
                        key={index}
                        id={index.toString()}
                        keyvar={index}
                        modifyLicenseHandler={modifyLicenseHandler}
                        removeLicenseHandler={removeLicenseHandler}
                        classes={classes}
                    >
                        {console.log("kwon Index", index)}
                    </LicenseItem>
                ))}

            </Container>
        </Modal>
    );
}
const LicenseItem = ({ keyvar, license, removeLicenseHandler, classes, modifyLicenseHandler }) => {
    return (
        <Grid container spacing={2} >
            {console.log("indexLicense", keyvar, license)}
            <Grid item xs={12} sm={4}>
                <Input
                    className={classes.textInput}
                    defaultValue={"제품명: " + license.prdtNm}
                    disabled inputProps={{ 'aria-label': 'description' }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Input
                    className={classes.textInput}
                    defaultValue={"납품 단가: " + license.contAmt + "원"}
                    disabled inputProps={{ 'aria-label': 'description' }}
                />

            </Grid>
            <Grid item xs={12} sm={1}>
                <Button
                    className={classes.inputButton}
                    variant="outlined"
                    color="primary"
                    onClick={() => modifyLicenseHandler(keyvar)}
                >수정
                </Button>
            </Grid>
            <Grid item xs={12} sm={1}>
                <Button
                    className={classes.delButton}
                    variant="outlined"
                    color="secondary"
                    onClick={() => removeLicenseHandler(keyvar)}
                >삭제
                </Button>
            </Grid>
        </Grid>


    );
};


export default PossibleContractModal;