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
        width:"100%"
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

const PossibleContModal = ({ licenseButtonChange, custList, licenseUpdateHandler, handleUpdate, buttonFlag, licenseShowModal, visible, managerList, confirmLoading, handleOk, handleCancel, handleChangeInput, licenseHandleDelete, contForm }) => {
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
            title="임시라이센스정보"
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
                                options={custList}
                                onChange={autoCompleteHandleChange}
                                getOptionLabel={option => option.custNm}
                                inputValue={contForm.custNm}
                                value={{ custNm: contForm.custNm }}
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
                                        value={contForm.empNm}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                id="empId"
                                options={managerList}
                                onChange={autoCompleteHandleChange}
                                getOptionLabel={option => option.empNm}
                                inputValue={contForm.empNm}
                                value={{ empNm: contForm.empNm }}
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
                                        value={contForm.empNm}
                                    />
                                )}
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                required
                                fullWidth
                                name="user"
                                label="사용자 이름"
                                id="user"
                                onChange={handleChange}
                                autoComplete="off"
                                value={contForm.user}
                            />
                        </Grid>


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
                                value={contForm.macAddr}
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    className={classes.textDate}
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    //margin="normal"
                                    id="requestDate"
                                    label="요청일자"
                                    fullWidth
                                    value={contForm.requestDate}
                                    onChange={handlecontDtChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
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
                                value={contForm.issueReason}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button size="large"
                                className={classes.prdtBtn}
                                onClick={licenseShowModal}
                                variant="outlined">제품 등록
                            </Button>
                        </Grid>



                    </Grid>
                </form>

                {contForm.lcns.map((license, index) => (

                    <LicenseItem

                        license={license}
                        key={index}
                        id={index.toString()}
                        keyvar={index}
                        licenseUpdateHandler={licenseUpdateHandler}
                        licenseHandleDelete={licenseHandleDelete}
                        classes={classes}
                        licenseButtonChange={licenseButtonChange}
                    >
                        {console.log("kwon Index", index)}
                    </LicenseItem>
                ))}

            </Container>
        </Modal>
    );
}
const LicenseItem = ({ licenseButtonChange, keyvar, license, licenseHandleDelete, classes, licenseUpdateHandler }) => {
    return (
        <Grid container spacing={2} >
            {console.log("Possible indexLicense", keyvar, license)}
            <Grid item xs={12} sm={9}>
                <Input
                    className={classes.textInput}
                    value={"제품명: " + license.prdtNm}
                    disabled inputProps={{ 'aria-label': 'description' }}
                />
            </Grid>
            <Grid item xs={12} sm={1}>
            </Grid>
            <Grid item xs={12} sm={1}>
                <Button
                    className={classes.inputButton}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        licenseUpdateHandler(keyvar)
                        licenseButtonChange()
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
                    onClick={() => licenseHandleDelete(keyvar)}
                >삭제
                </Button>
            </Grid>
        </Grid>


    );
};


export default PossibleContModal;