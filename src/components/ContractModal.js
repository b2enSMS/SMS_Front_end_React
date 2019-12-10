import React from 'react';
import { Modal } from 'antd';
import { Container, TextField, Grid } from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

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
        handleChangeInput({ form: "contractModal", key: ev.target.id, value: ev.target.value })
    }

    const autoCompleteHandleChange = (ev, value) => {
        console.log("autoCompleteHandleChange", value)
        for (var key in value) {
            handleChangeInput({ form: "contractModal", key: key, value: value[key] });
        }
    }

    //계약 일자 변경
    const [selectedcontDt, setSelectedcontDt] = React.useState(new Date());
    const handlecontDtChange = (id,date) => {
        setSelectedcontDt(date);
        handleChangeInput({ form: "contractModal", key: "contDt" , value: date })
    };
    //설치 일자 변경
    const [selectedinstallDt, setSelectedinstallDt] = React.useState();
    const handleinstallDtChange =  (id,date) => {
        setSelectedinstallDt(date);
        handleChangeInput({ form: "contractModal", key: "installDt" , value: date })
    };
    //검수 일자 변경
    const [selectedcheckDt, setSelectedcheckDt] = React.useState(new Date());
    const handlecheckDtChange =  (id,date) => {
        setSelectedcheckDt(date);
        handleChangeInput({ form: "contractModal", key: "checkDt" , value: date })
    };
    //유지보수개시일 변경
    const [selectedmtncStartDt, setSelectedmtncStartDt] = React.useState(new Date());
    const handlemtncStartDtChange = (id,date) => {
        setSelectedmtncStartDt(date);
        handleChangeInput({ form: "contractModal", key: "mtncStartDt" , value: date })
    };
    //유지보수종료일 변경
    const [selectedmtncEndDt, setSelectedmtncEndDt] = React.useState(new Date());
    const handlemtncEndDtChange =  (id,date) => {
        setSelectedmtncEndDt(date);
        handleChangeInput({ form: "contractModal", key: "mtncEndDt" , value: date })
    };

    return (
        <Modal
            title="계약정보 등록"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            style={{ top: 25 }}
            width="60%"
        >
            <Container component="main" fixed>
                <form className={classes.form} autoComplete="off">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="contTotAmt"
                                label="총계약금액"
                                id="contTotAmt"
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </Grid>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>                            
                        <Grid item xs={12} sm={6}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"
                                id="contDt"
                                label="계약일자"
                                fullWidth
                                value={selectedcontDt}
                                onChange={handlecontDtChange}
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
                                    margin="normal"
                                    id="installDt"
                                    label="설치일자"
                                    fullWidth
                                    value={selectedinstallDt}
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
                                    margin="normal"
                                    id="checkDt"
                                    label="검수일자"
                                    fullWidth
                                    value={selectedcheckDt}
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
                                    margin="normal"
                                    id="mtncStartDt"
                                    label="유지보수 개시일"
                                    fullWidth
                                    value={selectedmtncStartDt}
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
                                    margin="normal"
                                    id="mtncEndDt"
                                    label="유지보수 종료일"
                                    fullWidth
                                    value={selectedmtncEndDt}
                                    onChange={handlemtncEndDtChange}
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
                                margin="normal"
                                required
                                fullWidth
                                name="expire"
                                label="수주보고서 번호"
                                id="contReportNo"
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="etc"
                                label="라이센스 번호"
                                id="contReportNo"
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Modal>
    );
}
export default ContractModal;