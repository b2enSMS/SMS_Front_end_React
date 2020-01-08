import React from 'react';
import { Modal} from 'antd';
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
    imageStyle: {
        paddingTop: theme.spacing(3)
    },
    iconStyle: {
        marginLeft: theme.spacing(1)
    },
    inline: {
        display: "inline-block"
    },

}));

const PossibleContLicense = ({ handleUpdateCancel,
    updateOk,
    btnFlag, 
    visible, 
    confirmLoading, 
    handleOk, 
    handleCancel, 
    handleChangeInput, 
    licenseCodeList, 
    productList, 
    licenseForm }) => {

    const classes = useStyles();
    // const handleChange = ev => {
    //     handleChangeInput({ form: "licenseForm", key: ev.target.id, value: ev.target.value })
    // }

    const autoCompleteHandleChange = (ev, value) => {
        console.log("autoCompleteHandleChange", value)
        for (var key in value) {
            handleChangeInput({ form: "licenseForm", key: key, value: value[key] });
        }
    }
    const licenseCodeHandleChange = (ev, value) => {
        handleChangeInput({ form: "licenseForm", key: "lcnsTpCd", value: value["cmmnDetailCd"] });
        handleChangeInput({ form: "licenseForm", key: "lcnsTpNm", value: value["cmmnDetailCdNm"] });
    }
    //발행일 변경
    const handlelcnsIssuDtChange = (id, date) => {
        handleChangeInput({ form: "licenseForm", key: "lcnsIssuDt", value: date })
    };
    //개시일자 변경
    const handlelcnsStartDtChange = (id, date) => {
        handleChangeInput({ form: "licenseForm", key: "lcnsStartDt", value: date })
    };
    //종료일자 변경
    const handlelcnsEndDtChange = (id, date) => {
        handleChangeInput({ form: "licenseForm", key: "lcnsEndDt", value: date })
    };   

    return (
        <Modal
            title="제품 등록"
            visible={visible}
            onOk={() => {btnFlag? handleOk() : updateOk()}}
            okText={btnFlag ? "등록" : "수정"}
            confirmLoading={confirmLoading}
            onCancel={() => {btnFlag? handleCancel() : handleUpdateCancel()}}
            cancelText="취소"
            style={{ top: 120 }}
            width="35%"
            maskClosable={false}
        >
            <Container component="main" fixed>
                <form className={classes.form} >
                    <Grid container spacing={1} >
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                id="prdtId"
                                options={productList}
                                onChange={autoCompleteHandleChange}
                                getOptionLabel={option => option.prdtNm}
                                inputValue={licenseForm.prdtNm}
                                value={{ prdtNm: licenseForm.prdtNm }}
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
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                id="lcnsTpCd"
                                options={licenseCodeList}
                                onChange={licenseCodeHandleChange}
                                getOptionLabel={option => option.cmmnDetailCdNm}
                                inputValue={licenseForm.lcnsTpNm}
                                value={{ cmmnDetailCdNm: licenseForm.lcnsTpNm }}
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
                                        value={licenseForm.lcnsTpNm}
                                    />
                                )}
                            />
                        </Grid>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    margin="normal"
                                    id="lcnsIssuDt"
                                    label="발행일"
                                    fullWidth
                                    value={licenseForm.lcnsIssuDt}
                                    onChange={handlelcnsIssuDtChange}
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
                                    id="lcnsStartDt"
                                    label="계약일자"
                                    fullWidth
                                    value={licenseForm.lcnsStartDt}
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
                                    value={licenseForm.lcnsEndDt}
                                    onChange={handlelcnsEndDtChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
                </form>
            </Container>
        </Modal >
    );
}
export default PossibleContLicense;
  