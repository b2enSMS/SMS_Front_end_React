import React, { useState, useEffect } from 'react';
import { Table, Modal, Menu, Dropdown, Icon, message } from 'antd';
import { withStyles, Button, Container, TextField } from '@material-ui/core/';
import 'antd/dist/antd.css';
//import { Link } from 'react-router-dom';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  tableoption:{
    
  },

  option: {
    marginTop:theme.spacing(16),
    marginBotton:theme.spacing(8),
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
    dataIndex: 'compNm',
  },
  {
    title: 'manager',
    dataIndex: 'mgrNm',
  },
  {
    title: 'address',
    dataIndex: 'lcnsNo',
  },
  {
    title: 'date',
    dataIndex: 'date',
  },
  {
    title: 'valid',
    dataIndex: 'expireDate',
  },
  {
    title: 'etc',
    dataIndex: 'etc',
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

function managerToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}


function ContractTable() {
  const classes = useStyles();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visible, setvisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [contractList, setContractList] = useState([]);
  const [compNm, setCompNm] = useState("");
  const [mgrNm, setMgrNm] = useState("");
  const [lcnsNo, setLcnsNo] = useState("");
  const [date, setDate] = useState("");
  const [expireDate, SetExpire] = useState("");
  const [etc, setEtc] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [imagePreviewUrl, setImagePreviewUrl] = useState(false);
  const [managers,setManagers] = useState([]);


  const getAllmanager=async()=>{
    let list = await axios.get('/helloSpringBoot-0.0.1-SNAPSHOT/customers/showall')
    setManagers(manager => list.data)
  }
  
  useEffect(() => {
    handleContractAll()
  });

  //모달 태그를 보여주는 함수
  const showModal = () => {
    getAllmanager();
    setvisible(visible => true)
  };
  //모달에서 Ok버튼을 눌렀을 때 작동하는 함수
  const handleOk = async () => {
    //image 포맷
    // let fd = new FormData();
    // fd.append('file', { selectedFile });
    //서버에 전송!
    await axios.post('/helloSpringBoot-0.0.1-SNAPSHOT/contracts/create',
      {
        compNm: compNm,
        mgrNm: mgrNm,
        lcnsNo: lcnsNo,
        date: date,
        expireDate: expireDate,
        etc: etc,
        // img: fd
      }).then(handleContractAll());

    setConfirmLoading(confirmLoading => true)

    setTimeout(() => {
      setConfirmLoading(confirmLoading => false)
      setvisible(visible => false)
    }, 2000);
  };

  const handleCancel = e => {
    console.log(e);
    setvisible(visible => false)
  };
  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys)
  };

  const handleChange = ev => {
    let val = ev.currentTarget.value;
    let name = ev.currentTarget.name;

    if (name === 'organization') { setCompNm(val) }
    else if (name === 'manager') { setMgrNm(val) }
    else if (name === 'LicenseNumber') { setLcnsNo(val) }
    else if (name === 'date') { setDate(val) }
    else if (name === 'expire') { SetExpire(val) }
    else if (name === 'etc') { setEtc(val) }

  }

  const handleContractAll = async () => {
    let list = await axios.get('/helloSpringBoot-0.0.1-SNAPSHOT/contracts/showall')
    setContractList(contractList => list.data)
  }

  // const fileChangedHandler = event => {
  //   console.log('filechangeHandler active');
  //   setSelectedFile(selectedFile => event.target.files[0]);

  //   let reader = new FileReader();

  //   reader.onloadend = () => {
  //     setImagePreviewUrl(imagePreviewUrl => reader.result);
  //   }

  //   reader.readAsDataURL(event.target.files[0])

  // }


  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;


  // let $imagePreview = (<div className="previewText image-container"></div>);
  // if ( imagePreviewUrl ) {
  //   $imagePreview = (<div className="image-container" ><img src={imagePreviewUrl} alt="icon" width="200" /> </div>);
  // }



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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} size="small" />

      <Modal
        title="계약정보 등록"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        style={{ top: 25 }}
      >
        <Container component="main" maxWidth="xs">
          <form className={classes.form}>

            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="organization"
              label="기관명"
              name="organization"
              autoComplete="organization"
              onChange={handleChange}
              autoFocus
            />
            <Autocomplete
              id="manager"
              variant="outlined"
              fullWidth
              style={{marginBottom:8,marginTop:16}}
              required
              options={managers}
              classes={{
                option: classes.option,
              }}
              autoHighlight
              getOptionLabel={option => option.custId}
              renderOption={option => (
                <React.Fragment>
                  <span>{managerToFlag(option.custId)}</span>
                  {option.compNm} ({option.mgrNm}) {option.telNo}
                </React.Fragment>
              )}
              renderInput={params => (
                <TextField
                  {...params}
                  label="담당자 선택"
                  variant="outlined"
                  className={classes.textField}
                  fullWidth
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'disabled', // disable autocomplete and autofill
                  }}
                />
              )}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="LicenseNumber"
              label="라이센스 번호"
              name="LicenseNumber"
              onChange={handleChange}
              autoComplete="LicenseNumber"
            />

            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="date"
              label="납품일"
              id="date"
              onChange={handleChange}
              autoComplete="date"
            />

            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="expire"
              label="유지보수 만료일"
              id="expire"
              onChange={handleChange}
              autoComplete="expire"
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="etc"
              label="기타사항"
              id="etc"
              onChange={handleChange}
              autoComplete="etc"
            />
            {/* <div style={{ paddingTop: 8 }}>
              <input type="file" name="avatar" onChange={fileChangedHandler} />
              {$imagePreview}
            </div> */}
          </form>
        </Container>
      </Modal>
    </div >


  );
}
export default ContractTable


