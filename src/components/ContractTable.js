import React, { useState } from 'react';
import { Table, Menu, Dropdown, Icon, message } from 'antd';
import { withStyles, Button } from '@material-ui/core/';
import 'antd/dist/antd.css';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  tableoption: {

  },

  option: {
    marginTop: theme.spacing(16),
    marginBotton: theme.spacing(8),
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

const columns = [
  {
    title: 'organization',
    dataIndex: 'orgNm',
  },
  {
    title: 'manager',
    dataIndex: 'empNm',
  },
  {
    title: 'address',
    dataIndex: 'contDt',
  },
  {
    title: 'date',
    dataIndex: 'contTotAmt',
  },
  {
    title: 'valid',
    dataIndex: 'mtncStartDt',
  },
  {
    title: 'etc',
    dataIndex: 'contReportNo',
  },
  {
    title: '',
    dataIndex: 'menuTag',
    width: '5%',
  },
];

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">
      수정
    </Menu.Item>

  </Menu>
);

const menuTag = (<Dropdown overlay={menu} placement="bottomLeft">
  <Button size="small"><Icon type="menu" /></Button>
</Dropdown>
)

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    compNm: '서울시청',
    mgrNm: `권대환 ${i}`,
    lcnsNo: `A1234567 ${i}`,
    date: '11월 15일',
    expireDate: '5월 21일',
    etc: 'System',
    menuTag: menuTag,
  });
}


function ContractTable({ loadingTable, contractList, showModal }) {
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

  return (
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
      {!loadingTable && contractList && (
        <Table rowSelection={rowSelection} columns={columns} dataSource={contractList} size="small" />
      )}


    </div >


  );
}
export default ContractTable


