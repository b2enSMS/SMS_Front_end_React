import React from 'react';
import { Container, TextField, Grid } from '@material-ui/core/';
import {Modal} from "antd";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Input} from "../contract/ContractModal";


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
        mnProps: {
            textAlign: 'right',
        },
        custProps: {
            paddingRight: theme.spacing(1),
            paddingLeft: theme.spacing(1)
        },
    },
}));

const MeetingModal = ({handleUpdateOk,b2enModal, meetCd, orgModal, updateVisible, HandleCancel, handleChangeInput, meetingModal, buttonFlag, handleOk}) => {

    const classes = useStyles();


    const handleinstallDtChange = (id, date) => {
        handleChangeInput({ form: "meetingModal", key: "meetDt", value: date })
    };

    const handleChange = ev => {
        handleChangeInput({ form: "meetingModal", key: ev.target.id, value: ev.target.value })
    };

    const MeetingCodeHandleChange = (ev, value)=>{
        handleChangeInput({ form: "meetingModal", key: "meetTpCd", value: value["cmmnDetailCd"] });
        handleChangeInput({ form: "meetingModal", key: "meetTpCdNm", value: value["cmmnDetailCdNm"] });

    }

    return(
        <Modal
            title="미팅 정보"
            visible={updateVisible}
            okText={buttonFlag?"등록":"수정"}
            onOk={buttonFlag?handleOk:handleUpdateOk}
            onCancel={HandleCancel}
            style={{ top: 25 }}
        >
            <Container component="main" maxWidth="xs">
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>

                    {/*<Autocomplete
                        id="orgId"
                        options={orgList}
                        onChange={autoCompleteHandleChange}
                        getOptionLabel={option => option.orgNm}
                        inputValue={meetingModal.orgNm}
                        value={{ orgNm: meetingModal.orgNm }}
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
                                value={meetingModal.orgNm}
                            />
                        )}
                    />*/}
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
                    <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                //margin="normal"
                                id="meetDt"
                                label="미팅 날짜"
                                fullWidth
                                value={meetingModal.meetDt}
                                onChange={handleinstallDtChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    {/*<TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="meetDt"
                        label="날짜"
                        name="custNm"
                        value={meetingModal.meetDt}
                        onChange={handleChange}
                    />*/}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="meetStartTime"
                                label="시작 시간"
                                type="time"
                                fullWidth
                                value={meetingModal.meetStartTime}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="meetTotTime"
                                label="소요 시간"
                                name="meetTotTime"
                                value={meetingModal.meetTotTime}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                        </Grid>
                        <Grid item xs={12} sm={10}>

                    <Autocomplete
                        id="meetTpCdId"
                        options={meetCd}
                        onChange={MeetingCodeHandleChange}
                        inputValue={meetingModal.meetTpCdNm}
                        value={{ cmmnDetailCdNm: meetingModal.meetTpCdNm }}
                        getOptionLabel={option => option.cmmnDetailCdNm}
                        renderInput={params => (
                            <TextField
                                {...params}
                                className={classes.textField}
                                variant="outlined"
                                required
                                margin="normal"
                                label="미팅 코드"
                                fullWidth
                                //value={possibleCustomerModal.custTpCdNm}
                            />
                        )}
                    />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Button className={classes.custProps} size="large" variant="outlined" onClick={orgModal}>고객 + </Button>
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Button  size="large" variant="outlined" onClick={b2enModal}>담당자 +</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Modal>
    );
};

/*const CustomerList = ({ keyvar, license, removeLicenseHandler, classes }) => {
    return (
        <Grid container spacing={2} >
            {console.log("indexLicense", keyvar, license)}
            <Grid item xs={12} sm={4}>
                <Input
                    className={classes.textInput}
                    value={"고객 명 : " + license.prdtNm}
                    disabled inputProps={{ 'aria-label': 'description' }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Input
                    className={classes.textInput}
                    value={"고객 사 : " + (parseInt(license.contAmt) / 1000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 만원 "}
                    disabled inputProps={{ 'aria-label': 'description' }}
                />
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
};*/




export default MeetingModal