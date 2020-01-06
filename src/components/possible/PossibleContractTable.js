import React from 'react';
import { Table, Menu, Dropdown, Icon } from 'antd';
import { withStyles, Button } from '@material-ui/core/';
import 'antd/dist/antd.css';
//import RemoveIcon from '@material-ui/icons/Remove';
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
        fontWeight: 'bold'
    },
    minusbutton: {
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        fontWeight: 'bold'
    },

    backgroundRed: {
        backgroundColor: '#fff1f0',
        color: 'red'
    },

    amountColumn: {
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

// const RemoveButton = withStyles(theme => ({
//   root: {
//     borderColor: '#0062cc',
//     '&:hover': {
//       borderColor: '#0062cc',
//     },
//   },
// }))(Button);

function PossibleContractTable({ handleHistoryModal, loadingTable, contractList, showModal, deleteData, updateModalHandler, modalBtnHandler }) {
    const classes = useStyles();
    // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const handleMenuClick = key => {
        console.log("key", key);
        updateModalHandler(key)
    }
    const columns = [
        {
            title: '기관/회사',
            dataIndex: 'orgNm',
            ellipsis: true,
            width: '12%'
        },
        {
            title: '기관담당자',
            dataIndex: 'custNm',
            align: 'center',
            //ellipsis: true,
            //width: '20%'
        },
        {
            title: '담당자',
            dataIndex: 'empNm',
            align: 'center',
            // width: '5%',
        },
        {
            title: 'Mac주소',
            dataIndex: 'macAddr',
            align: 'center',
            // width: '5%',
        },
        {
            title: '요청일',
            dataIndex: 'requestDate',
            align: 'center',
            // width: '8%',
            render: (value, record, index) => {
                return {
                    children: value,
                    props: {
                        align: 'center',
                    },
                };
            }
        },
        {
            title: '비고',
            dataIndex: 'issueReason',
            align: 'center',
            // width: '5%',
        },

        {
            title: '',
            dataIndex: 'menuTag',
            width: '5%',
            render: (text, record) =>
                (<Dropdown
                    overlay={(
                        <Menu onClick={(e) => {
                            if (e.key === "1") {
                                handleMenuClick(record.tempVerId)
                                modalBtnHandler()
                            } else {
                                handleHistoryModal(record.tempVerId)
                            }
                        }}>
                            <Menu.Item key="1">
                                상세
                            </Menu.Item>

                            <Menu.Item key="2">
                                히스토리
                            </Menu.Item>
                        </Menu>
                    )}

                    placement="bottomLeft">

                    <Button size="small"><Icon type="menu" /></Button>
                </Dropdown>
                )
        },
    ];
    // const onSelectChange = selectedRowKeys => {
    //     console.log('selectedRowKeys changed: ', selectedRowKeys);
    //     setSelectedRowKeys(selectedRowKeys)
    // };

    // const rowSelection = {
    //     selectedRowKeys,
    //     onChange: onSelectChange,
    // };

    // const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <div style={{ marginLeft: 8, textAlign: 'left' }}>
                {/* {hasSelected ? `${selectedRowKeys.length} 개 선택` : '0 개 선택'} */}
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
                    > 계약 등록
          </ColorButton>
                </span>
                {/* <RemoveButton
          onClick={() => { deleteData(selectedRowKeys); setSelectedRowKeys([]); }}
          className={classes.minusbutton}
          size='small'
          variant="outlined"
          color="secondary"
          endIcon={<RemoveIcon />}
        > 계약 삭제
          </RemoveButton> */}
            </div>

            <Table
                rowKey="tempVerId"
                loading={loadingTable}
                tableLayout='fixed'
                rowClassName="editable-row"
                columns={columns}
                dataSource={loadingTable ? null : contractList}
                size="small" />
        </div >

    );
}
export default PossibleContractTable


