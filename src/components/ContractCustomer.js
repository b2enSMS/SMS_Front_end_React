import React, { useState } from 'react';
import {makeStyles} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { withStyles, Button } from '@material-ui/core/';
import {Table} from "antd";

const textcolor = '#174A84';

const ColorButton = withStyles(theme => ({
    root: {
        borderColor: '#0062cc',
        '&:hover': {
            borderColor: '#0062cc',
        },
    },
}))(Button);

const RemoveButton = withStyles(theme => ({
    root: {
        borderColor: '#0062cc',
        '&:hover': {
            borderColor: '#0062cc',
        },
    },
}))(Button);

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    option: {
        marginTop: theme.spacing(16),
        marginBotton: theme.spacing(8),
    },
    tablepart: {
        //paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    container: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        //paddingBottom: theme.spacing(1),
    },
    menuName: {
        padding: theme.spacing(5),
        color: textcolor,
        fontWeight: '700',
    },
    button: {
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(5),
        textAlign: 'right',
        marginTop: -21,

    },
    plusbutton: {
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
    },
    minusbutton: {
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
    },
}));

const columns = [
    {
        title: 'organization',
        dataIndex: 'customerName',
    },
    {
        title: 'name',
        dataIndex: 'custName',
    },
    {
        title: 'email',
        dataIndex: 'custEmail',
    },
    {
        title: 'phoneNum',
        dataIndex: 'custNum',
    },
    {
        title: 'customerCode',
        dataIndex: 'custCode',
    },
];


const ContractCustomer = ({loadingTable, customerList, showModal}) => {
    const classes = useStyles();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return(
        <div>
            <div style={{ marginLeft: 8, textAlign: 'left' }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : 'Selected 0 item'}
            </div>

            <div className={classes.button}>
                <span style={{ paddingRight: 14 }}>

              <ColorButton
                  onClick={showModal}
                  className={classes.plusbutton}
                  size='small'
                  variant="outlined"
                  color="primary"
                  endIcon={<AddIcon />}
              > Add New
              </ColorButton>
            </span>
                <RemoveButton
                    className={classes.minusbutton}
                    size='small'
                    variant="outlined"
                    color="secondary"
                    endIcon={<RemoveIcon />}
                > Remove
                </RemoveButton>
            </div>
            {console.log("loadingTable",loadingTable)}
            {loadingTable && '로딩 중...'}
            {!loadingTable && customerList && (
                <Table rowSelection={rowSelection} columns={columns} dataSource={customerList} size="small" />
            )}
        </div>
    );
}
export default ContractCustomer;