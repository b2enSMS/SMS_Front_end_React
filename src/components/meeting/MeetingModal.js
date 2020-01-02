import React from 'react';
import { Container, TextField, Grid } from '@material-ui/core/';
import {Modal} from "antd";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

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

const MeetingModal = ({handleUpdateOk, orgList, b2enList, updateVisible, HandleCancel, handleChangeInput, meetingModal, buttonFlag, handleOk}) => {

    const classes = useStyles();


    const handleinstallDtChange = (id, date) => {
        handleChangeInput({ form: "meetingModal", key: "meetDt", value: date })
    };


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
                <form className={classes.form} noValidate>
                    <Grid container spacing={3}>

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
                        <Grid item xs={12} sm={12}>
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
                        type="meetStartTime"
                        defaultValue="00:00"
                        className={classes.textField}
                        //onChange={handleChangeTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="meetStartTime"
                                label="시작 시간"
                                type="time"
                                defaultValue="07:30"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </Grid>
                    {/*<Autocomplete
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
                    />*/}
                        <Grid item xs={12} sm={6}>
                            <Button variant="outlined" size="small" color="primary" className={classes.margin}>
                                고객  +
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="outlined" size="small" color="primary" className={classes.margin}>
                                담당자 +
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Modal>
    );
}

export default MeetingModal