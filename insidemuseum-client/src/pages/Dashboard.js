import React, { Component }from 'react';
import { Layout, Breadcrumb, Table, Space, Typography, Input, Button, notification} from 'antd';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import AddMember from '../_components/_member/AddMember.js'


const { Content } = Layout;
const { Title } = Typography;




class Dashboard extends Component {

    state = {
        members: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
        searchText: '',
        searchedColumn: ''
    }


    componentDidMount() {
        axios.get(`http://localhost:3000/kyohaku/ja`,{ crossDomain: true })
        .then(response => {
            const members = response.data;
            this.setState({ members });
        })
        .catch(error => console.log(error));
        
    }

    handleTableChange = (pagination) => {
        this.setState({
            pagination: {
                ...pagination
            }
        });
    }

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({ 
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    }

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: ''});
    }
    addMember = (newmem) =>{
        this.state.members.push(newmem)
    }
    handleSubmit = (value,event) => {
        axios.delete(`https://5ecdcfb77c528e00167cd7e5.mockapi.io/api/members/${value}`)
            .then(res => {
                notification.open({
                    type: 'success',
                    message: 'Success',
                    description: 'delete success!',
                    duration: 2
                });
            })
            .catch((err)=>{
                // alert("failed")
                notification.open({
                    type: 'error',
                    message: 'Delete failed',
                    description: 'Please try again',
                    duration: 2
                });
            })
        setTimeout(function(){
            window.location.reload(); // you can pass true to reload function to ignore the client cache and reload from the server
        },3000);
    }


    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8}}>
                <Input 
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Select ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width:188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90}}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => this.state.selectedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />) : ( text ),
    });

    render() {

        const { members, pagination, loading } = this.state;
        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: 'ID',
                dataIndex: 'organization_item_key',
                key: 'organization_item_key',
                // render: text => <a>{text}</a>,
                // ...this.getColumnSearchProps('name')
            },
            {
                title: 'Museum',
                dataIndex: 'organization_path_name',
                key: 'organization_path_name'
            },
            // {
            //     title: 'Working Parts',
            //     dataIndex: 'bophan',
            //     key: 'bophan'
                
            // },
            // {
            //     title: 'Competence',
            //     dataIndex: 'chucvu',
            //     key: 'chucvu',
            //     ...this.getColumnSearchProps('chucvu')
            // },
            // {
            //     title: 'Action',
            //     key: 'action',
            //     dataIndex: 'id',
            //     render: text => (
            //     <div>
            //         <Button type="primary">
            //             <Link to={`/drone-management/members/profile/${ text }`}>View</Link>
            //         </Button>
            //         <Popconfirm title={`Do you really want to delete this person?`} onConfirm={() => this.handleSubmit(text)} okText="Yes" cancelText="No">
            //             <Button type="primary" danger >Delete</Button>
            //         </Popconfirm>
            //     </div>
            //     )
            // }
        ];  
        return (
            
            <div>
                {/* {this.state.members} */}
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 1000,
                    }}
                >
                    <Title>Members Management</Title>
                    <Table
                        columns={columns}
                        dataSource={members}
                        pagination={pagination}
                        loading={loading}
                        onChange={this.handleTableChange}
                    />
                    
                </Content>
                <AddMember id = {this.state.members.length+1} addMember = {this.addMember} />  
            </div>
            
        );
    }
}


export default Dashboard;