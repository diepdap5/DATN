import React, { Component } from 'react';
import { Layout, Breadcrumb, Col, Row, Typography, Select, Button, Spin, Table, Steps } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const { Step } = Steps;
const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

class UpdateModel extends Component {
    state = {
        update_museum: '',
        update_history: [],
        records_list: [],
        loading: 0,
        // loading = 0 : init
        // loading = 1 : loading step 1
        // loading = 2 : done step 1
        // loading = 3 : init step 2
        // loading = 4 : loading step 2
        // loading = 5 : done step 2
        current: 0
    }
    componentDidMount() {
        axios.get(`http://localhost:3000/history_model`, { crossDomain: true })
            .then(response => {
                var update_model_history = [];
                var update_history = [];
                update_model_history = response.data;
                var museum_name = '';
                for (var i=0 ; i<update_model_history.length; i++){
                    
                    if ( i === 0) {
                        museum_name = "Tokyo National Museum"
                    }
                    else if ( i === 1){
                        museum_name = "Kyoto National Museum"
                    }
                    else if ( i === 2){
                        museum_name = "Nara National Museum"
                    }
                    else{
                        museum_name = "Kyushu National Museum"
                    }
                    var data = {
                        "key" : i + 1,
                        "museum" : museum_name,
                        "modified_at": update_model_history[i]["modified_at"]
                    }
                    update_history.push(data);
                }
                this.setState({
                    update_history: update_history
                });

            })
            .catch(error => console.log(error));
    }
    onChange = current => {
        if (this.state.loading === 2){
            this.setState({ current: current, loading: 3 });
        }
        
    };
    render() {
        const { loading, update_museum, current, update_history } = this.state;
        let step1Status;
        let step2Status;
        if (loading === 0) {
            step1Status = <Button type="primary" onClick={(value) => {
                this.setState({
                    loading: 1,
                    update_museum: update_museum
                })
            }} >Cập nhật</Button>
            step2Status = <br></br>
        }
        else if (loading === 1) {
            step1Status = <Spin size="large" />
            step2Status = <br></br>
            axios.put(`http://localhost:3000/update_model/image/` + update_museum.value, { crossDomain: true })
                .then(response => {
                    this.setState({
                        loading: 2
                    });
                })
                .catch(error => console.log(error));
        }
        else if (loading === 2) {
            step1Status = <p style={{ color: 'green' }}>Complete successfully!</p>
            step2Status = <br></br>
        }
        else if(loading === 3){
            step1Status = <br></br>
            step2Status = <Button type="primary" onClick={(value) => {
                this.setState({
                    loading: 4,
                })
            }} >Cập nhật</Button>
        }
        else if (loading === 4) {
            step1Status = <br></br>
            step2Status = <Spin size="large" />
            axios.put(`http://localhost:3000/update_model/model/` + update_museum.value + '/3', { crossDomain: true })
            .then(response => {
                this.setState({
                    loading: 5
                });
            })
            .catch(error => console.log(error));
        }
        else {
            step1Status = <br></br>
            step2Status = <p style={{ color: 'green' }}>Request update successfully! Updated date will be avaiable in few minutes</p>
        }

        const columns = [
            {
                title: <b>ID</b>,
                dataIndex: 'key',
                key: 'key',
            },
            {
                title: <b>Museum</b>,
                dataIndex: 'museum',
                key: 'museum',
            },
            {
                title: <b>Latest modify</b>,
                dataIndex: 'modified_at',
                key: 'modified_at',
                render(text, row) {
                    var ISOTime = text;
                    var year_month_date = ISOTime.split("T")[0];
                    var hour_minute_second = ISOTime.split("T")[1];
                    hour_minute_second = hour_minute_second.split(".")[0];
                    var timeString = year_month_date + "  " + hour_minute_second;
                    return timeString;
                }
            },
        ];
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Quản lý mô hình</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col span={15}>
                        <Content
                            style={{
                                padding: 10,
                                margin: 0,
                                minHeight: 500,
                                backgroundColor: 'white'
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <Title level={2}>Lịch sử cập nhật</Title>
                            </div>
                            <Table dataSource={update_history} columns={columns} />;
                        </Content>
                    </Col>
                    <Col span={9}>
                        <Content
                            style={{
                                padding: 10,
                                margin: 0,
                                minHeight: 500,
                                backgroundColor: 'white'
                            }}
                        >

                            <div style={{ textAlign: 'center' }}>
                                <Title level={2}>Cập nhật mô hình</Title>

                                    Lựa chọn bảo tàng muốn cập nhật:
                                    <br></br>
                                <br></br>
                                <Select
                                    labelInValue
                                    defaultValue={{ value: 'tnm' }}
                                    style={{ width: 250 }}
                                    onChange={(value) => {
                                        this.setState({
                                            update_museum: value
                                        })
                                    }}
                                >
                                    <Option value="tnm">Tokyo National Museum</Option>
                                    <Option value="kyohaku">Kyoto National Museum</Option>
                                    <Option value="narahaku">Nara National Museum</Option>
                                    <Option value="kyuhaku">Kyushu National Museum</Option>
                                </Select>
                                <br></br>
                                <br></br>
                            </div>
                            <Row>
                                <Col>
                                    <Steps current={current} onChange={this.onChange} direction="vertical">
                                        <Step title="Bước 1" description="Cập nhật dữ liệu" />
                                        <Step title="Bước 2" description="Cập nhật mô hình" />
                                    </Steps>
                                </Col>
                                <Col>
                                    <Content
                                        style={{
                                            padding: 10,
                                            margin: 0,
                                            minHeight: 60,
                                            minWidth: 200,
                                        }}
                                    >
                                        <div style={{ textAlign: 'center' }}>
                                            {step1Status}
                                        </div>
                                    </Content>
                                    <Content
                                        style={{
                                            padding: 10,
                                            margin: 0,
                                            minHeight: 60,
                                            minWidth: 200,
                                        }}
                                    >
                                        <div style={{ textAlign: 'center' }}>
                                            {step2Status}
                                        </div>
                                    </Content>
                                </Col>
                            </Row>
                        </Content>

                    </Col>
                </Row>

            </div>
        );
    }
}


export default withRouter(UpdateModel);