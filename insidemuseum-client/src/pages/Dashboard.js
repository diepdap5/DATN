import React, { Component } from 'react';
import {
    Layout, Breadcrumb, Table, Space, Typography, Input, Button, Row, Dropdown, Menu,
    
} from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';


const { Content } = Layout;
const { Title } = Typography;
class Dashboard extends Component {

    state = {
        artifacts: [],
        pagination: {
            current: 1,
            pageSize: 20,
        },
        loading: false,
        searchText: '',
        searchedColumn: '',
        language: 'ja'
    }
    componentDidMount() {
        axios.get(`http://localhost:3000/getAll/`+ this.state.language, { crossDomain: true })
            .then(response => {
                const artifacts = response.data;
                this.setState({ artifacts });
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
        this.setState({ searchText: '' });
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Select ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
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
            />) : (text),
    });
    
    handleMenuClick = ({key}) => {
        axios.get(`http://localhost:3000/getAll/`+ key, { crossDomain: true })
            .then(response => {
                const artifacts = response.data;
                this.setState({ artifacts });
            })
            .catch(error => console.log(error));
        this.setState({language: key});
    }

    render() {
        const { artifacts, pagination, loading, language } = this.state;
        const columns = [
            
            {
                title: 'ID',
                dataIndex: 'organization_item_key',
                key: 'organization_item_key',
                ...this.getColumnSearchProps('organization_item_key')
            },
            {
                title: 'T??n hi???n v???t',
                dataIndex: 'title',
                key: 'title',
                sorter: (a, b) => a.title.localeCompare(b.title)
            },
            {
                title: 'Lo???i t??i s???n v??n h??a',
                dataIndex: 'bunkazai',
                key: 'bunkazai',
            },
            {
                title: 'Th??? lo???i',
                dataIndex: 'bunrui',
                key: 'bunrui',
                sorter: (a, b) => a.bunrui.localeCompare(b.bunrui)
            },
            {
                title: 'Ni??n ?????i',
                dataIndex: 'jidai_seiki',
                key: 'jidai_seiki'
            },
            {
                title: 'B???o t??ng',
                dataIndex: 'organization_title',
                key: 'organization_title'
            },
            {
                title: ' ',
                key: 'action',
                dataIndex: ['organization_item_key', 'organization_path_name'],
                render: (text,row) => (
                <div>
                    <Button type="primary">
                        <Link to={`/details/${row["organization_path_name"]}/${ row["organization_item_key"] }`}>Xem chi ti???t</Link>
                    </Button>
                </div>
                )
            }
        ];
        let button;
        if (language === 'en') {
            button = <Button > Ng??n ng??? d??? li???u: Ti???ng Anh </Button>;
        } else if (language === 'ja') {
            button = <Button > Ng??n ng??? d??? li???u: Ti???ng Nh???t</Button>;
        }
        else {
            button = <Button > Ng??n ng??? d??? li???u: Ti???ng Vi???t</Button>;
        }
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key='en'> Ti???ng Anh </Menu.Item>
                <Menu.Item key='ja'> Ti???ng Nh???t </Menu.Item>
                <Menu.Item key='vi'> Ti???ng Vi???t </Menu.Item>
            </Menu>
        );
        return (
            <div>
                {/* {this.state.members} */}
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Qu???n l?? d??? li???u / </Breadcrumb.Item>
                </Breadcrumb>

                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 1000,
                    }}
                >
                    <Title>Qu???n l?? d??? li???u</Title>
                    <Row>
                        <Dropdown overlay={menu}>
                            {button}
                        </Dropdown>
                    </Row>
                    <br>
                    </br>
                    <Table
                        columns={columns}
                        dataSource={artifacts}
                        pagination={pagination}
                        loading={loading}
                        onChange={this.handleTableChange}
                        rowKey="organization_item_key"
                    />

                </Content>
            </div>

        );
    }
}


export default Dashboard;