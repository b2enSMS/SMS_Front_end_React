import React from 'react';
import { Modal } from 'antd';
import { Container, TextField, Grid, Button, Input } from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import 'lib/css/ant.css';

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
        marginTop: theme.spacing(1.8)
    },


}));

const PossibleContractModal = ({ licenseupdatebtn, custML, modifyLicenseHandler, handleUpdate, buttonFlag, licenseModalShow, visible, b2enML, confirmLoading, handleOk, handleCancel, handleChangeInput, removeLicenseHandler, contractForm }) => {
    const classes = useStyles();
    const handleChange = ev => {
        handleChangeInput({ form: "possibleForm", key: ev.target.id, value: ev.target.value })
    }

    const autoCompleteHandleChange = (ev, value) => {
        console.log("autoCompleteHandleChange", value)
        for (var key in value) {
            handleChangeInput({ form: "possibleForm", key: key, value: value[key] });
        }
    }
    //요청 일자 변경
    const handlecontDtChange = (id, date) => {
        handleChangeInput({ form: "possibleForm", key: "requestDate", value: date })
    };
    return (
        <Modal
            title="임시계약정보"
            visible={visible}
            onOk={buttonFlag ? handleOk : handleUpdate}
            okText={buttonFlag ? "등록" : "수정"}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            cancelText="취소"
            style={{ top: 80 }}
            width="40%"
            maskClosable={false}
        >
            {console.log("dfjefe", buttonFlag)}
            <Container component="main" fixed>
                <form className={classes.form} autoComplete="off">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                id="custId"
                                options={custML}
                                onChange={autoCompleteHandleChange}
                                getOptionLabel={option => option.custNm}
                                inputValue={contractForm.custNm}
                                value={{ custNm: contractForm.custNm }}
                                disableClearable={true}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                        //margin="normal"
                                        label="기관 담당자명"
                                        fullWidth
                                        value={contractForm.empNm}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                id="empId"
                                options={b2enML}
                                onChange={autoCompleteHandleChange}
                                getOptionLabel={option => option.empNm}
                                inputValue={contractForm.empNm}
                                value={{ empNm: contractForm.empNm }}
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
                                        value={contractForm.empNm}
                                    />
                                )}
                            />
                        </Grid>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>

                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    className={classes.textDate}
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    //margin="normal"
                                    id="requestDate"
                                    label="요청일자"
                                    fullWidth
                                    value={contractForm.requestDate}
                                    onChange={handlecontDtChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                //margin="normal"
                                required
                                fullWidth
                                name="macAddr"
                                label="Mac주소"
                                id="macAddr"
                                onChange={handleChange}
                                autoComplete="off"
                                value={contractForm.macAddr}
                            />
                        </Grid>



                        <Grid item xs={12} sm={6}>
                            <Button size="large"
                                className={classes.prdtBtn}
                                onClick={licenseModalShow}
                                variant="outlined">제품 등록
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                required
                                fullWidth
                                multiline
                                name="issueReason"
                                label="요청사유"
                                id="issueReason"
                                onChange={handleChange}
                                autoComplete="off"
                                value={contractForm.issueReason}
                            />
                        </Grid>





                    </Grid>
                </form>

                {contractForm.lcns.map((license, index) => (

                    <LicenseItem

                        license={license}
                        key={index}
                        id={index.toString()}
                        keyvar={index}
                        modifyLicenseHandler={modifyLicenseHandler}
                        removeLicenseHandler={removeLicenseHandler}
                        classes={classes}
                        licenseupdatebtn={licenseupdatebtn}
                    >
                        {console.log("kwon Index", index)}
                    </LicenseItem>
                ))}

            </Container>
        </Modal>
    );
}
const LicenseItem = ({ licenseupdatebtn, keyvar, license, removeLicenseHandler, classes, modifyLicenseHandler }) => {
    return (
        <Grid container spacing={2} >
            {console.log("Possible indexLicense", keyvar, license)}
            <Grid item xs={12} sm={4}>
                <Input
                    className={classes.textInput}
                    value={"제품명: " + license.prdtNm}
                    disabled inputProps={{ 'aria-label': 'description' }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>

            </Grid>
            <Grid item xs={12} sm={1}>
                <Button
                    className={classes.inputButton}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        modifyLicenseHandler(keyvar)
                        licenseupdatebtn()
                    }
                    }
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