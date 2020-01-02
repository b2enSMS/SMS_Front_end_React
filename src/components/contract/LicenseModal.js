import React, { useEffect, useState } from 'react';
import { Modal, Upload, Icon, message } from 'antd';
import { Container, TextField, Grid, Button } from '@material-ui/core/';
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

const LicenseModal = ({ handleUpdateCancel,
    updateOk,
    btnFlag, 
    imageRemoveFlag, 
    handleImageRemove, 
    handleImageChange,
    visible, 
    confirmLoading, 
    handleOk, 
    handleCancel, 
    handleChangeInput, 
    licenseCodeList, 
    productList, 
    licenseForm }) => {

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

    const [fileList, setFileList] = useState([]);

    useEffect(()=>{
        console.log("useEffect", licenseForm.fileList);
        setFileList(licenseForm.fileList.concat());
    }, [licenseForm.fileList])

    console.log("fileList::", fileList);

    const props2 = {
        action: 'http://localhost:9000/sms/api/scan/upload',
        listType: 'picture',
        className: 'upload-list-inline',
        fileList: fileList,
        onChange(info) {

            // console.log("onChange()()()", info.file,licenseForm.fileList)
            // let fileList = [...info.fileList];

            // // 1. Limit the number of uploaded files
            // // Only to show two recent uploaded files, and old ones will be replaced by the new
            // fileList = fileList.slice(-2);

            // // 2. Read from response and show file link
            // fileList = fileList.map(file => {
            //     console.log("response", file.response)
            //     if (file.response) {
            //         // Component will show file.url as link
            //         file.url = file.response.url;
            //         file.thumbUrl = file.response.thumbUrl;
            //     }
            //     return file;
            // });
            // console.log("info.file", info.file)
            // handleImageChange(info.file)

            let newFileList = [...info.fileList];
            const { status } = info.file;
            console.log("status::", status);
            console.log("licenseForm.fileList::", JSON.stringify(info.file));
            if (status === 'done') {
                message.success(`${info.file.name} 등록 성공!`);
            } else if (status === 'error') {
                message.error(`${info.file.name} 등록 실패...`);
            }
            setFileList(newFileList)
            // handleImageChange(newFileList)
        },
        onRemove(file) {
            console.log("onRemove", file, imageRemoveFlag)
            const arr = []
            arr.push(file)
            handleImageRemove(arr)
            if (imageRemoveFlag) {
                return true;
            }
            else {
                return false;
            }
        },
    };

    return (
        <Modal
            title="제품 등록"
            visible={visible}
            onOk={() => {btnFlag? handleOk(fileList) : updateOk(fileList)}}
            okText={btnFlag ? "등록" : "수정"}
            confirmLoading={confirmLoading}
            onCancel={() => {setFileList([]); btnFlag? handleCancel(licenseForm.fileList) : handleUpdateCancel()}}
            cancelText="취소"
            style={{ top: 65 }}
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
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="number"
                                name="contAmt"
                                label="납품 가격"
                                id="contAmt"
                                onChange={handleChange}
                                autoComplete="off"
                                value={licenseForm.contAmt}
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
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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

                <div className={classes.imageStyle}>
                    <Upload {...props2}
                    >
                        <Button size="large" variant="outlined">
                            스캔본 <Icon className={classes.iconStyle} type="upload" />
                        </Button>
                        {/* {licenseForm.imageFile === {} ?
                             : ""} */}

                    </Upload>
                </div>
            </Container>
        </Modal >
    );
}
export default LicenseModal;
  