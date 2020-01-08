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
        //marginTop: theme.spacing(3.5)
    },


}));

const ContModal = ({ licenseButtonChange,custList, headContList, licenseUpdateHandler, handleUpdate, buttonFlag, licenseShowModal, visible, contCdList, orgList, managerList, confirmLoading, handleOk, handleCancel, handleChangeInput, licenseHandleDelete, contForm }) => {
    const classes = useStyles();
    const handleChange = ev => {
        handleChangeInput({ form: "contForm", key: ev.target.id, value: ev.target.value })
    }

    const autoCompleteHandleChange = (ev, value) => {
        console.log("autoCompleteHandleChange", value)
        for (var key in value) {
            handleChangeInput({ form: "contForm", key: key, value: value[key] });
        }
    }
    const contCodeHandleChange = (ev, value) => {
        handleChangeInput({ form: "contForm", key: "contTpCd", value: value["cmmnDetailCd"] });
        handleChangeInput({ form: "contForm", key: "contTpNm", value: value["cmmnDetailCdNm"] });

    }

    // const lcnsInputHandleChange = ev => {
    //     console.log("lcnsInputHandleChange", ev);
    //     console.log("name, hidden", ev.target.value, ev.target.hidden, ev.target.id, ev.target.value);
    //     inputPriceChange({ form: "contForm", key: "contAmt", idx: ev.target.id, value: ev.target.value })
    // }

    //계약 일자 변경
    const handlecontDtChange = (id, date) => {
        handleChangeInput({ form: "contForm", key: "contDt", value: date })
    };
    //설치 일자 변경
    const handleinstallDtChange = (id, date) => {
        handleChangeInput({ form: "contForm", key: "installDt", value: date })
    };
    //검수 일자 변경
    const handlecheckDtChange = (id, date) => {
        handleChangeInput({ form: "contForm", key: "checkDt", value: date })
    };
    //유지보수개시일 변경
    const handlemtncStartDtChange = (id, date) => {
        handleChangeInput({ form: "contForm", key: "mtncStartDt", value: date })
    };
    //유지보수종료일 변경
    const handlemtncEndDtChange = (id, date) => {
        handleChangeInput({ form: "contForm", key: "mtncEndDt", value: date })
    };




    return (
        <Modal
            title="계약정보"
            visible={visible}
            onOk={buttonFlag ? handleOk : handleUpdate}
            okText={buttonFlag ? "등록" : "수정"}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            cancelText="취소"
            style={{ top: 15 }}
            width="40%"
            maskClosable={false}
        >
            {console.log("dfjefe", buttonFlag)}
            <Container component="main" fixed>
                <form className={classes.form} autoComplete="off">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                id="orgId"
                                options={orgList}
                                onChange={autoCompleteHandleChange}
                                getOptionLabel={option => option.orgNm}
                                inputValue={contForm.orgNm}
                                value={{ orgNm: contForm.orgNm }}
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
                                        value={contForm.orgNm}
                                    />
                                )}
                            />
                        </Grid>
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
                                        value={contForm.custNm}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                //margin="normal"
                                required
                                fullWidth
                                name="contNm"
                                label="사업명"
                                id="contNm"
                                onChange={handleChange}
                                autoComplete="off"
                                value={contForm.contNm}
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
                            <Autocomplete
                                id="contTpCd"
                                options={contCdList}
                                onChange={contCodeHandleChange}
                                getOptionLabel={option => option.cmmnDetailCdNm}
                                inputValue={contForm.contTpNm}
                                value={{ cmmnDetailCdNm: contForm.contTpNm }}
                                disableClearable={true}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                        //margin="normal"
                                        label="계약 유형"
                                        fullWidth
                                    //value={contForm.contTpNm}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                id="headContId"
                                disabled={contForm.contTpCd === "" ? false : contForm.contTpCd === "cont02" ? false : true}
                                options={headContList}
                                onChange={autoCompleteHandleChange}
                                getOptionLabel={option => option.headContNm}
                                inputValue={contForm.headContNm}
                                value={{ headContNm: contForm.headContNm }}
                                disableClearable={true}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                        //margin="normal"
                                        label={contForm.contTpCd === "" ? "모계약" : contForm.contTpCd === "cont02" ? "모계약" : "모계약 정보 필요 없음"}
                                        fullWidth
                                        value={contForm.headContNm}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                //margin="normal"
                                required
                                fullWidth
                                name="contReportNo"
                                label="수주보고서 번호"
                                id="contReportNo"
                                onChange={handleChange}
                                autoComplete="off"
                                value={contForm.contReportNo}
                            />
                        </Grid>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>

                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    //margin="normal"
                                    id="installDt"
                                    label="설치일자"
                                    fullWidth
                                    value={contForm.installDt}
                                    onChange={handleinstallDtChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    //margin="normal"
                                    id="checkDt"
                                    label="검수일자"
                                    fullWidth
                                    value={contForm.checkDt}
                                    onChange={handlecheckDtChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    //margin="normal"
                                    id="mtncStartDt"
                                    label="유지보수 개시일"
                                    fullWidth
                                    value={contForm.mtncStartDt}
                                    onChange={handlemtncStartDtChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    //margin="normal"
                                    id="mtncEndDt"
                                    label="유지보수 종료일"
                                    fullWidth
                                    value={contForm.mtncEndDt}
                                    onChange={handlemtncEndDtChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    className={classes.textDate}
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    //margin="normal"
                                    id="contDt"
                                    label="계약일자"
                                    fullWidth
                                    value={contForm.contDt}
                                    onChange={handlecontDtChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>

                        <Grid item xs={12}>
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
const LicenseItem = ({ licenseButtonChange,keyvar, license, licenseHandleDelete, classes, licenseUpdateHandler }) => {
    return (
        <Grid container spacing={2} >
            {console.log("indexLicense", keyvar, license)}
            <Grid item xs={12} sm={4}>
                <Input
                    className={classes.textInput}
                    value={"제품명: " + license.prdtNm}
                    disabled inputProps={{ 'aria-label': 'description' }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Input
                    className={classes.textInput}
                    value={"납품 단가: " + (parseInt(license.contAmt) / 1000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 만원 "}
                    disabled inputProps={{ 'aria-label': 'description' }}
                />
            </Grid>
            <Grid item xs={12} sm={1}>
                <Button
                    className={classes.inputButton}
                    variant="outlined"
                    color="primary"
                    onClick={() => {licenseUpdateHandler(keyvar)
                        licenseButtonChange()}
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


export default ContModal;