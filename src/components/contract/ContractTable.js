import React, { useState } from 'react';
import { Table, Menu, Dropdown, Icon } from 'antd';
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

  backgroundRed:{
    backgroundColor: '#fff1f0',
    color: 'red'
  },

  amountColumn:{
    marginRight: '10px'
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


const handleMenuClick = key => {
  console.log("key", key);
}


const columns = [
  {
    title: '기관/회사',
    dataIndex: 'orgNm',
  },
  {
    title: '담당자',
    dataIndex: 'empNm',
  },
  {
    title: '수주번호',
    dataIndex: 'contReportNo',
    align: 'center',
    render: (value, record, index) =>{
      return {
        children: value,
        props: {
          align: 'center',
        },
      };
    }
  },
  {
    title: '계약일자',
    dataIndex: 'contDt',
    align: 'center',
    render: (value, record, index) =>{
      return {
        children: value,
        props: {
          align: 'center',
        },
      };
    }
  },
  {
    title: '계약금액',
    dataIndex: 'contTotAmt',
    align: 'right',
    render: (value, record, index) =>{
      return {
        children: (value==null?"-":parseInt(value)/1000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" 만원 ",
        props: {
          align: 'right',
        },
      };
    }
  },
  {
    title: '검수일자',
    dataIndex: 'checkDt',
    align: 'center',
    render: (value, record, index) =>{
      return {
        children: value,
        props: {
          align: 'center',
        },
      };
    }
  },
  {
    title: '유지보수개시일자',
    dataIndex: 'mtncStartDt',
    align: 'center',
    render: (value, record, index) =>{
      return {
        children: value,
        props: {
          align: 'center',
        },
      };
    }
  },
  {
    title: '유지보수종료일자',
    dataIndex: 'mtncEndDt',
    align: 'center',
    render: (value, record, index) =>{
      return {
        children: value,
        props: {
          align: 'center',
        },
      };
    }
  },

  {
    title: '',
    dataIndex: 'menuTag',
    width: '5%',
    render: (text, record) =>
      (<Dropdown
        overlay={(
          <Menu onClick={() => {
            handleMenuClick(record.contId)
          }}>
            <Menu.Item >
              수정
          </Menu.Item>
          </Menu>
        )}

        placement="bottomLeft">

        <Button size="small"><Icon type="menu" /></Button>
      </Dropdown>
      )
  },
];

function ContractTable({ loadingTable, contractList, showModal, deleteData }) {
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
          onClick={() => { deleteData(selectedRowKeys); setSelectedRowKeys([]); }}
          className={classes.minusbutton}
          size='small'
          variant="outlined"
          color="secondary"
          endIcon={<RemoveIcon />}
        > Remove
          </RemoveButton>
      </div>

      <Table
        rowKey="contId"
        loading={loadingTable}
        tableLayout='undefined'
        rowSelection={rowSelection}
        columns={columns}
        rowClassName={(record,index) => {
          if(contractList[index].tight) 
            return classes.backgroundRed
        }}
        dataSource={loadingTable ? null : contractList}
        size="small" />
    </div >

  );
}
export default ContractTable


