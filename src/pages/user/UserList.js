import React from 'react';
import { Table } from 'antd';
import {connect} from 'dva';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const namespace = 'users';
const data = (state) => {
    const usersData = state[namespace].data;
    return {
        usersData
    }
};

const dispatchMethod = (dispatch) => {
    return {
        initData: () => {
            dispatch({
                type: namespace + "/initData"
            })
        }
    }
};

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};
@connect(data, dispatchMethod)
class UserList extends React.Component{
    componentDidMount() {
        this.props.initData();
    }

    render() {
        return (
            <div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.usersData.data} />
            </div>
        )
    }
}

export default UserList;