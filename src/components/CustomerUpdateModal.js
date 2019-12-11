import React from 'react';
import { Container, TextField } from '@material-ui/core/';
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {Modal} from "antd";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

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

const code = [
    {
        value: 'contract',
        label: '계약고객',
    },
    {
        value: 'possible',
        label: '임시고객',
    },
];

const user = [
    {
        value: 'manager',
        label: '담당자',
    },
    {
        value: 'user',
        label: '사용자',
    },
];

const CustomerUpdateModal = ({visible, handleOk, confirmLoading, handleCancel, handleChangeInput, orgList}) => {

    const classes = useStyles();
    const [tree, setTree] = React.useState('contract');
    const [men, setMen] = React.useState('user');

    console.log("orgList",orgList);

    const handleChange = ev => {
        setTree(ev.target.value);
        handleChangeInput({form:"contractCustomerModal", key: ev.target.id, value: ev.target.value});
    }
    const handleChange2 = ev => {
        setMen(ev.target.value);
        handleChangeInput({form:"contractCustomerModal", key: ev.target.id, value: ev.target.value});
    }


    const autoCompleteHandleChange = (ev, value) => {
        for(var key in value) {
            handleChangeInput({form: "contractCustomerModal", key: key, value: value[key]});
        }
    }

    return(
        <Modal
            title="고객정보 등록"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            style={{ top: 25 }}
        >
            <Container component="main" maxWidth="xs">
                <form className={classes.form}>

                    <Autocomplete
                        id="orgId"
                        options={orgList}
                        onChange={autoCompleteHandleChange}
                        getOptionLabel={options => options.orgNm}
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
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="custNm"
                        label="고객명"
                        name="custNm"
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="custRankNm"
                        label="직책"
                        name="custRankNm"
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="이메일"
                        name="email"
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="telNo"
                        label="전화번호"
                        id="telNo"
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        id="custCode"
                        select
                        required
                        label="고객 유형"
                        fullWidth
                        value={tree}
                        onChange={handleChange}
                    >
                        {code.map(option => (
                            <MenuItem  key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        margin="normal"
                        id="custCode"
                        select
                        required
                        label="담당자? 사용자?"
                        fullWidth
                        value={men}
                        onChange={handleChange2}
                    >
                        {user.map(option => (
                            <MenuItem  key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </form>
            </Container>
        </Modal>
    );
}

export default CustomerUpdateModal