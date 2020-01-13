import React, { useState } from 'react'
import Highlighter from 'react-highlight-words';
import { Icon, Input, Button as AntButton } from 'antd';




export default function GetColumnSearchProps(dataIndex, name) {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    let searchInput
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };
    return ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (

            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`${name}을(를) 검색하세요`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <AntButton
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"

                    style={{ width: 80, marginRight: 29, align: 'left' }}
                >
                    검색
        </AntButton>
                <AntButton onClick={() => handleReset(clearFilters)} size="small" style={{ width: 80 }}>
                    리셋
        </AntButton>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) => {
            // return record[dataIndex]
            //     .toString()
            //     .toLowerCase()
            //     .includes(value.toLowerCase())
            //return record.children && record.children[0][dataIndex].toLowerCase().startsWith(value)
            return
            record.children &&
                Object.keys(record.children).some(k => record.children[k][dataIndex].toLowerCase().includes(value.toLowerCase()))
                //record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        },
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    })
}