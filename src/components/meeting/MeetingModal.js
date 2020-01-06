import React from 'react';
import { Container, TextField, Grid } from '@material-ui/core/';
import { Modal, Select } from "antd";
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Autocomplete from '@material-ui/lab/Autocomplete';

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

const MeetingModal = ({ handleUpdateOk, b2enModal, meetCd, orgModal, updateVisible, HandleCancel, handleChangeInput, meetingModal, buttonFlag, handleOk }) => {

    const classes = useStyles();

    //const { Option } = Select;

    const children = [];

    const handleinstallDtChange = (id, date) => {
        handleChangeInput({ form: "meetingModal", key: "meetDt", value: date })
    };

    const handleChange = ev => {
        handleChangeInput({ form: "meetingModal", key: ev.target.id, value: ev.target.value })
    };

    const MeetingCodeHandleChange = (ev, value) => {
        handleChangeInput({ form: "meetingModal", key: "meetTpCd", value: value["cmmnDetailCd"] });
        handleChangeInput({ form: "meetingModal", key: "meetTpCdNm", value: value["cmmnDetailCdNm"] });

    }

    return (
        <Modal
            title="미팅 정보"
            visible={updateVisible}
            okText={buttonFlag ? "등록" : "수정"}
            onOk={buttonFlag ? handleOk : handleUpdateOk}
            onCancel={HandleCancel}
            style={{ top: 25 }}
        >
            <Container component="main" maxWidth="xs">
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="meetStartTime"
                                label="시작 시간"
                                type="time"
                                fullWidth
                                value={meetingModal.meetStartTime}
                                onChange={handleChange}
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
                                        value={meetingModal.meetTpCdNm}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Select
                                mode="multiple"
                                size='default'
                                placeholder="Please select"
                                defaultValue={['a10', 'c12']}
                                onChange={handleChange}
                                style={{ width: '100%' }}
                            >
                                {children}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Select
                                mode="multiple"
                                size='default'
                                placeholder="Please select"
                                defaultValue={['a10', 'c12']}
                                onChange={handleChange}
                                style={{ width: '100%' }}
                            >
                                {children}
                            </Select>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Modal>
    );
};



export default MeetingModal