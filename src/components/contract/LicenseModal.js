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

const LicenseModal = ({ visible, confirmLoading, handleOk, handleCancel, handleChangeInput,licenseCodeList,productList,licenseForm}) => {
    const classes = useStyles();
    const handleChange = ev => {
        handleChangeInput({ form: "licenseForm", key: ev.target.id, value: ev.target.value })
    }

    const autoCompleteHandleChange = (ev, value) => {
        console.log("autoCompleteHandleChange", value)
        for (var key in value) {
            handleChangeInput({ form: "licenseForm", key: key, value: value[key] });
        }
    }
    const licenseCodeHandleChange=(ev,value)=>{
        handleChangeInput({ form: "licenseForm", key: "lcnsTpCd", value: value["cmmnDetailCd"] });
        handleChangeInput({ form: "licenseForm", key: "lcnsTpNm", value: value["cmmnDetailCdNm"] });
    }
     //발행일 변경
     const [selectedlcnsIssuDt, setSelectedlcnsIssuDt] = React.useState(new Date());
     const handlelcnsIssuDtChange = (id, date) => {
         setSelectedlcnsIssuDt(date);
         handleChangeInput({ form: "licenseForm", key: "lcnsIssuDt", value: date })
     };
     //개시일자 변경
     const [selectedlcnsStartDt, setSelectedlcnsStartDt] = React.useState();
     const handlelcnsStartDtChange = (id, date) => {
         setSelectedlcnsStartDt(date);
         handleChangeInput({ form: "licenseForm", key: "lcnsStartDt", value: date })
     };
     //종료일자 변경
     const [selectedlcnsEndDt, setSelectedlcnsEndDt] = React.useState(new Date());
     const handlelcnsEndDtChange = (id, date) => {
         setSelectedlcnsEndDt(date);
         handleChangeInput({ form: "licenseForm", key: "lcnsEndDt", value: date })
     };

    return (
        <Modal
            title="제품 등록"
            visible={visible}
            onOk={handleOk}
            okText="등록"
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            cancelText="취소"
            style={{ top: 25 }}
            width="35%"
            maskClosable={false}
        >
            <Container component="main" fixed>
                <form className={classes.form} >
                    <Grid container >
                        <Grid item xs={12}>
                            <Autocomplete
                                id="prdtId"
                                options={productList}
                                onChange={autoCompleteHandleChange}
                                getOptionLabel={option => option.prdtNm}
                                inputValue={licenseForm.prdtNm}
                                disableClearable={true}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                        margin="normal"
                                        label="제품 이름"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="number"
                                name="contAmt"
                                label="제품 가격"
                                id="contAmt"
                                onChange={handleChange}
                                autoComplete="off"
                                value={licenseForm.contAmt}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                id="lcnsTpCd"
                                options={licenseCodeList}
                                onChange={licenseCodeHandleChange}
                                getOptionLabel={option => option.cmmnDetailCdNm}
                                inputValue={licenseForm.lcnsTpNm}
                                disableClearable={true}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        className={classes.textField}
                                        variant="outlined"
                                        required
                                        margin="normal"
                                        label="라이센스 유형"
                                        fullWidth
                                        autoComplete="off"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="lcnsNo"
                                label="라이센스 번호"
                                id="lcnsNo"
                                onChange={handleChange}
                                autoComplete="off"
                                value={licenseForm.lcnsNo}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="certNo"
                                label="증명 번호"
                                id="certNo"
                                onChange={handleChange}
                                autoComplete="off"
                                value={licenseForm.certNo}
                            />
                        </Grid>



                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    margin="normal"
                                    id="lcnsStartDt"
                                    label="계약일자"
                                    fullWidth
                                    value={selectedlcnsStartDt}
                                    onChange={handlelcnsStartDtChange}
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
                                    id="lcnsEndDt"
                                    label="종료일자"
                                    fullWidth
                                    value={selectedlcnsEndDt}
                                    onChange={handlelcnsEndDtChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    margin="normal"
                                    id="lcnsIssuDt"
                                    label="발행일"
                                    fullWidth
                                    value={selectedlcnsIssuDt}
                                    onChange={handlelcnsIssuDtChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
                </form>
            </Container>
        </Modal>
    );
}
export default LicenseModal;