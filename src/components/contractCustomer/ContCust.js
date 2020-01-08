import React from 'react';
import { Table} from "antd";
// Dropdown, Icon, Menu,

//const textcolor = '#174A84';

/*const ColorButton = withStyles(theme => ({
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
}))(Button);*/

// const useStyles = makeStyles(theme => ({
//     root: {
//         display: 'flex',
//     },
//     option: {
//         marginTop: theme.spacing(16),
//         marginBotton: theme.spacing(8),
//     },
//     tablepart: {
//         //paddingTop: theme.spacing(5),
//         paddingBottom: theme.spacing(5),
//         paddingLeft: theme.spacing(4),
//         paddingRight: theme.spacing(4),
//     },
//     container: {
//         paddingTop: theme.spacing(1),
//         paddingLeft: theme.spacing(0),
//         paddingRight: theme.spacing(0),
//         //paddingBottom: theme.spacing(1),
//     },
//     menuName: {
//         padding: theme.spacing(5),
//         color: textcolor,
//         fontWeight: '700',
//     },
//     button: {
//         paddingBottom: theme.spacing(1),
//         paddingRight: theme.spacing(5),
//         textAlign: 'right',
//         marginTop: -21,
//     },
//     plusbutton: {
//         paddingRight: theme.spacing(3),
//         paddingLeft: theme.spacing(3),
//         fontWeight: 'bold'
//     },
//     minusbutton: {
//         paddingRight: theme.spacing(3),
//         paddingLeft: theme.spacing(3),
//         fontWeight: 'bold'
//     },
// }));

const ContCust = ({ contCustList, loadingTable }) => {
    //const classes = useStyles();
    // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    /*const handleMenuClick = key => {
        console.log("key", key);
        showUpdateModal(key)
    }*/
    const columns = [
        {
            title: '기관',
            dataIndex: 'orgNm',
        },
        {
            title: '고객 이름',
            dataIndex: 'custNm',
            align: 'center',
        },
        {
            title: '직책',
            dataIndex: 'custRankNm',
            align: 'center',
        },
        {
            title: '이메일',
            dataIndex: 'email',
            align: 'center',
            ellipsis:true,
        },
        {
            title: '연락처',
            dataIndex: 'telNo',
            align: 'center',
        },
        {
            title: '고객 유형',
            dataIndex: 'custTpCdNm',
            align: 'center',
        },
        /*{
            title: '',
            dataIndex: 'menuTag',
            width: '5%',
            render: (text, record) =>
                (<Dropdown
                        overlay={(
                            <Menu onClick={() => {
                                handleMenuClick(record.custId)
                                changeButton()
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
        },*/
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

    return(
        <div>
            {/* <div style={{ marginLeft: 8, textAlign: 'left' }}>
                {hasSelected ? `${selectedRowKeys.length} 개 선택` : '0 개 선택'}
            </div> */}

            {/* <div className={classes.button}>
                <span style={{ paddingRight: 14 }}>

              <ColorButton
                  onClick={showModal}
                  className={classes.plusbutton}
                  size='small'
                  variant="outlined"
                  color="primary"
                  endIcon={<AddIcon />}
              > 고객 등록
              </ColorButton>
            </span>
               <RemoveButton
                    className={classes.minusbutton}
                    size='small'
                    variant="outlined"
                    color="secondary"
                    endIcon={<RemoveIcon />}
                    onClick={()=>{deleteCustomer(selectedRowKeys);setSelectedRowKeys([]);}}
                > 고객 삭제
                </RemoveButton>
            </div> */}
            <Table
                rowKey="custId"
                loading={loadingTable}
                tableLayout='undefined'
                //rowSelection={rowSelection}
                columns={columns}
                dataSource={loadingTable ? null : contCustList}
                size="small" />
        </div>
    );
}
export default ContCust;