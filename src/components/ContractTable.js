import React,{useState} from 'react';
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


const handleMenuClick= key =>{
  console.log("key",key);
}


const columns = [
  {
    title: 'organization',
    dataIndex: 'orgNm',
  },
  {
    title: 'b2en',
    dataIndex: 'empNm',
  },
  {
    title: 'contractdate',
    dataIndex: 'contDt',
  },
  {
    title: 'installDate',
    dataIndex: 'installDt',
  },
  {
    title: 'checkDate',
    dataIndex: 'checkDt',
  },
  {
    title: 'maintenanceStart',
    dataIndex: 'mtncStartDt',
  },
  {
    title: 'maintenanceEnd',
    dataIndex: 'mtncEndDt',
  },

  {
    title: '',
    dataIndex: 'menuTag',
    width: '5%',
    render: (text, record) =>
      (<Dropdown 
        overlay={(
          <Menu onClick={()=>{
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

function ContractTable({ loadingTable, contractList, showModal,deleteData}) {
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
          onClick={()=>{deleteData(selectedRowKeys);setSelectedRowKeys([]);}}
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
        dataSource={loadingTable ? null : contractList}
        size="small" />
    </div >

  );
}
export default ContractTable


