import React from 'react';
import { Container, TextField, Grid,InputAdornment } from '@material-ui/core/';
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
    mnProps: {
        textAlign: 'right',
    },
    custProps: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
    },
}));

const MeetingModal = ({
    selectHandleChange,
    handleUpdateOk,
    meetCd,
    updateVisible,
    HandleCancel,
    handleChangeInput,
    meetingModal,
    buttonFlag,
    handleOk,
    custList,
    myComList,
}) => {

    const classes = useStyles();

    const { Option } = Select;

    const handleinstallDtChange = (id, date) => {
        handleChangeInput({ form: "meetingModal", key: "meetDt", value: date })
    };

    const handleChange = ev => {
        handleChangeInput({ form: "meetingModal", key: ev.target.id, value: ev.target.value })
    };

    const meetingCodeHandleChange = (ev, value) => {
        handleChangeInput({ form: "meetingModal", key: "meetTpCd", value: value["cmmnDetailCd"] });
        handleChangeInput({ form: "meetingModal", key: "meetTpCdNm", value: value["cmmnDetailCdNm"] });

    }
    const custSelectHandler = (value) => {
        console.log("custSelectHandler",value)
        selectHandleChange({ form: "meetingModal", key: "custs", value: value });
    }
    const empSelectHandler = (value) => {
        console.log("empSelectHandler",value)
        selectHandleChange({ form: "meetingModal", key: "emps", value: value });
    }


    return (
        <Modal
            title="미팅 정보"
            visible={updateVisible}
            okText={buttonFlag ? "등록" : "수정"}
            onOk={buttonFlag ? handleOk : handleUpdateOk}
            onCancel={HandleCancel}
            cancelText="취소"
            disableClearable={true}
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

                        <Grid item xs={12} >
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                required
                                fullWidth
                                type="number"
                                id="meetTotTime"
                                label="소요 시간"
                                name="meetTotTime"
                                value={meetingModal.meetTotTime}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">분</InputAdornment>,
                                }}
                                inputProps={{
                                    step: 5,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>

                            <Autocomplete
                                id="meetTpCdId"
                                options={meetCd}
                                onChange={meetingCodeHandleChange}
                                inputValue={meetingModal.meetTpCdNm}
                                value={{ cmmnDetailCdNm: meetingModal.meetTpCdNm }}
                                getOptionLabel={option => option.cmmnDetailCdNm}
                                disableClearable={true}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        required
                                        //margin="normal"
                                        label="미팅 코드"
                                        fullWidth
                                        value={meetingModal.meetTpCdNm}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                required
                                fullWidth
                                multiline
                                name="meetCnt"
                                label="요청사유"
                                id="meetCnt"
                                onChange={handleChange}
                                autoComplete="off"
                                value={meetingModal.meetCnt}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Select
                                id='custId'
                                mode="multiple"
                                size='large'
                                placeholder="고객 담당자"
                                onChange={custSelectHandler}
                                value={meetingModal.custs}
                                labelInValue
                                style={{ width: '100%' }}
                            >
                                {custList.map((cust, index) => (
                                    <Option key={cust.custId}>{cust.custNm}</Option>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Select
                                id="empId"
                                mode="multiple"
                                size='large'
                                placeholder="비투엔 담당자"
                                onChange={empSelectHandler}
                                value={meetingModal.emps}
                                labelInValue
                                style={{ width: '100%' }}
                            >
                                {myComList.map((myCom, index) => (
                                    <Option key={myCom.empId}>{myCom.empNm}</Option>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Modal>
    );
};



export default MeetingModal