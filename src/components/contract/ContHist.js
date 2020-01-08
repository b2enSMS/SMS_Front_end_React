import React from 'react';
import { Modal, Table } from 'antd';
import { Container } from '@material-ui/core/';
//import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({


// }));

const ContHist = ({ visible, handleCancel, loadingTable, histList }) => {
    //const classes = useStyles();

    const columns = [

        {
            title: '담당자',
            dataIndex: 'empNm',
        },

        {
            title: '기관 담당자',
            dataIndex: 'custNm',
        },

        {
            title: '계약금액',
            dataIndex: 'contTotAmt',
            align: 'right',
            render: (value, record, index) => {
                return {
                    children: (value == null ? "-" : parseInt(value) / 1000).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 만원 ",
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
            title: '유지보수개시일자',
            dataIndex: 'mtncStartDt',
            align: 'center',
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
            title: '유지보수종료일자',
            dataIndex: 'mtncEndDt',
            align: 'center',
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
            title: '수정일자',
            dataIndex: 'createdDate',
            align: 'center',
            render: (value, record, index) => {
                return {
                    children: value,
                    props: {
                        align: 'center',
                    },
                };
            }
        },
    ];

    return (
        <Modal
            title="계약 히스토리"
            visible={visible}
            //onOk={}
            okText="닫기"
            onCancel={handleCancel}
            cancelText="취소"
            style={{ top: 40 }}
            width="70%"
            maskClosable={false}
            okButtonProps=
            {{ style: { display: 'none' } }}
        >

            <Container component="main" fixed>
                <div style={{ marginBottom: 3, fontWeight: 'bold', marginLeft: 3, textAlign: 'left' }}>
                    {histList.length>0? histList[0]['orgNm'] +" - "+ histList[0]['contNm']: "히스토리 목록이 없습니다."}
                </div>
                <Table
                    rowKey="histSeq"
                    loading={loadingTable}
                    tableLayout='undefined'
                    columns={columns}
                    dataSource={loadingTable ? null : histList}
                    size="small" />
            </Container>
        </Modal>
    );
}



export default ContHist;