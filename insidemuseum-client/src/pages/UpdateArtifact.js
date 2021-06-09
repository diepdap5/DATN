import React, { Component } from 'react';
import { Layout, Breadcrumb, Col, Row, Typography, Select, Button, Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import HistoryComponent from "../_components/updateArtifact/history_component"
const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;



class UpdateArtifact extends Component {
    state = {
        update_museum: '',
        update_history: {},
        records_list: [],
        timing: {},
        loading: 2,
    }
    componentDidMount() {
        axios.get(`http://localhost:3000/history_artifact`, { crossDomain: true })
            .then(response => {
                var update_history;
                update_history = response.data;
                console.log(update_history)
                this.setState({
                    update_history: update_history,
                    records_list: [update_history.count["tnm"],
                    update_history.count["kyohaku"],
                    update_history.count["narahaku"],
                    update_history.count["kyuhaku"]],
                    timing: {
                        "Bảo tàng Quốc gia Tokyo": update_history.history[0].modified_at,
                        "Bảo tàng Quốc gia Kyoto": update_history.history[1].modified_at,
                        "Bảo tàng Quốc gia Nara": update_history.history[2].modified_at,
                        "Bảo tàng Quốc gia Kyushu": update_history.history[3].modified_at
                    }
                });

            })
            .catch(error => console.log(error));

        console.log(this.state.update_museum)
    }

    render() {
        console.log(this.state.update_museum.value);
        // console.log(this.state.timing["Tokyo National Museum"]);
        const { loading, update_museum } = this.state;
        let loadingStatus;
        if (loading === 2) {
            loadingStatus = <Button type="primary" onClick={(value) => {
                this.setState({
                    loading: 1,
                })
            }} >Cập nhật</Button>
        }
        else if (loading === 1) {
            loadingStatus = <Spin size="large" />
            // console.log('hahahaha')
            // console.log(update_museum.value)
            // console.log("tada")
            axios.put(`http://localhost:3000/update/` + update_museum.value)
                .then(response => {
                    console.log(response);
                    this.setState({
                        loading: 0
                    });
                })
                .catch(error => console.log(error));
        }
        else {
            loadingStatus = <p style={{color: 'green'}}>Đã cập nhật yêu cầu thành công! Dữ liệu cập nhật sẽ có sau vài phút</p>
        }
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Quản lý dữ liệu</Breadcrumb.Item>
                    <Breadcrumb.Item>Cập nhật dữ liệu</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col span={15}>
                        <HistoryComponent records_list={this.state.records_list} timing={this.state.timing}/>
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
                                <Title level={2}>Cập nhật dữ liệu</Title>

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
                                    <Option value="tnm">Bảo tàng Quốc gia Tokyo</Option>
                                    <Option value="kyohaku">Bảo tàng Quốc gia Kyoto</Option>
                                    <Option value="narahaku">Bảo tàng Quốc gia Nara</Option>
                                    <Option value="kyuhaku">Bảo tàng Quốc gia Kyushu</Option>
                                </Select>
                                <br></br>
                                <br></br>
                                {loadingStatus}
                            </div>

                        </Content>
                    </Col>
                </Row>

            </div>
        );
    }
}


export default withRouter(UpdateArtifact);