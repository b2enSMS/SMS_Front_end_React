import React from 'react';
import { Modal, Table } from 'antd';
import { Container } from '@material-ui/core/';
//import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({


// }));

const PossibleContHist = ({ visible, handleCancel, loadingTable, histList }) => {
    //const classes = useStyles();

    const columns = [
        {
            title: 'b2en담당자',
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
                    {histList.length>0? histList[0]['orgNm'] +" - "+ histList[0]['custNm']: "히스토리 목록이 없습니다."}
                </div>
                <Table
                    rowKey="tempVerHistSeq"
                    loading={loadingTable}
                    tableLayout='undefined'
                    columns={columns}
                    dataSource={loadingTable ? null : histList}
                    size="small" />
            </Container>
        </Modal>
    );
}



export default PossibleContHist;