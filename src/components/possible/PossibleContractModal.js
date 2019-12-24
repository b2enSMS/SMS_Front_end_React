import React from 'react';
import { Modal } from 'antd';
import { Container, TextField, Grid, Button, Input } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
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
    textInput: {
        paddingTop: theme.spacing(2),
    },
    inputButton: {
        marginTop: theme.spacing(1),
    },
    dynamicSpan: {
        width: '100%',
    },
    textDate: {

    },
    prdtBtn: {
        marginTop: theme.spacing(3.5)
    }

}));


const PossibleContractModal = ({handleUpdate, buttonFlag,licenseModalShow, visible, contCdList, orgList, b2enML, confirmLoading, handleOk, handleCancel, handleChangeInput, licenses, removeLicenseHandler, contractForm }) => {
    const classes = useStyles();
    const handleChange = ev => {
        handleChangeInput({ form: "contractModal", key: ev.target.id, value: ev.target.value })
    }

    return (
        <Modal

            title="계약정보 등록"
            visible={visible}
            onOk={buttonFlag?handleOk:handleUpdate}
            okText={buttonFlag?"등록":"수정"}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            cancelText="취소"
            style={{ top: 50 }}
            width="40%"
            maskClosable={false}
        >
            {console.log("dfjefe",buttonFlag)}
            <Container component="main" fixed>
                <form className={classes.form} autoComplete="off">
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="expire"
                                label="수주보고서 번호"
                                id="custNm"
                                onChange={handleChange}
                                autoComplete="off"
                                value={contractForm.contReportNo}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="expire"
                                label="수주보고서 번호"
                                id="empNm"
                                onChange={handleChange}
                                autoComplete="off"
                                value={contractForm.contReportNo}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="expire"
                                label="수주보고서 번호"
                                id="macAddr"
                                onChange={handleChange}
                                autoComplete="off"
                                value={contractForm.contReportNo}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="expire"
                                label="수주보고서 번호"
                                id="lcnsNo"
                                onChange={handleChange}
                                autoComplete="off"
                                value={contractForm.contReportNo}
                            />
                        </Grid>
                    </Grid>
                </form>
                {contractForm.lcns.map((license, index) => (

                    <LicenseItem

                        license={license}
                        key={index}
                        id={index.toString()}
                        keyvar={index}
                        removeLicenseHandler={removeLicenseHandler}
                        classes={classes}
                    >
                        {console.log("kwon Index", index)}
                    </LicenseItem>
                ))}
            </Container>
        </Modal>
    );
}
const LicenseItem = ({ keyvar, license, removeLicenseHandler, classes }) => {
    return (
        <Grid container spacing={2} >
            {console.log("indexLicense", keyvar, license)}
            <Grid item xs={12} sm={4}>
                <Input
                    className={classes.textInput}
                    defaultValue={"제품명: " + license.prdtNm}
                    disabled inputProps={{ 'aria-label': 'description' }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Input
                    className={classes.textInput}
                    defaultValue={"납품 단가: " + license.contAmt + "원"}
                    disabled inputProps={{ 'aria-label': 'description' }}
                />

            </Grid>
            <Grid item xs={12} sm={2}>
                <Button
                    className={classes.inputButton}
                    variant="outlined"
                    color="secondary"
                    onClick={() => removeLicenseHandler(keyvar)}
                >삭제
                </Button>
            </Grid>
        </Grid>
    );
};

export default PossibleContractModal;