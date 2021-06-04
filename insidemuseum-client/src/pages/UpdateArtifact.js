import React, { Component } from 'react';
import { Layout, Breadcrumb, Col, Row, Typography, Select, Button, Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Bar } from "react-chartjs-2";
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
        axios.get(`http://localhost:3000/history`, { crossDomain: true })
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
                        "Tokyo National Museum": update_history.history[0].modified_at,
                        "Kyoto National Museum": update_history.history[1].modified_at,
                        "Nara National Museum": update_history.history[2].modified_at,
                        "Kyushu National Museum": update_history.history[3].modified_at
                    }
                });

            })
            .catch(error => console.log(error));
    }

    // requestUpdate(update_museum) {
    //     this.setState({
    //         loading: 1,
    //         request_update_museum: update_museum
    //     })
    //     // axios.get(`http://localhost:3000/update/` + update_museum, { crossDomain: true })
    //     // .then(response => {
    //     //     console.log(response);
    //     //     this.setState({
    //     //         loading: 2
    //     //     });

    //     // })
    //     // .catch(error => console.log(error));
    // }
    render() {
        console.log(this.state.update_museum.value);
        console.log(this.state.timing["Tokyo National Museum"]);
        const { timing, loading, update_museum } = this.state;
        let loadingStatus;
        if (loading === 2) {
            loadingStatus = <br></br>
        }
        else if (loading === 1) {
            loadingStatus = <Spin size="large" />
            console.log('hahahaha')
            console.log(update_museum.value)
            axios.put(`http://localhost:3000/update/` + update_museum.value, { crossDomain: true })
                .then(response => {
                    console.log(response);
                    this.setState({
                        loading: 0
                    });
                })
                .catch(error => console.log(error));
        }
        else {
            loadingStatus = "Request update successfully! Updated date will be avaiable in few minutes"
        }
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Quản lý dữ liệu</Breadcrumb.Item>
                    <Breadcrumb.Item>Cập nhật dữ liệu</Breadcrumb.Item>
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
                            <Bar
                                data={{
                                    labels: [
                                        "Tokyo National Museum",
                                        "Kyoto National Museum",
                                        "Nara National Museum",
                                        "Kyushu National Museum",
                                    ],
                                    datasets: [
                                        {
                                            label: "Số lượng hiện vật",
                                            backgroundColor: [
                                                "#3e95cd",
                                            ],
                                            data: this.state.records_list
                                        }
                                    ]
                                }}
                                options={{
                                    plugins: {
                                        tooltip: {
                                            callbacks: {
                                                label: function (context) {
                                                    var label = context.labels || '';
                                                    var museum = context.label

                                                    var ISOTime = timing[museum]
                                                    var year_month_date = ISOTime.split("T")[0];
                                                    var hour_minute_second = ISOTime.split("T")[1];
                                                    hour_minute_second = hour_minute_second.split(".")[0];
                                                    var timeString = year_month_date + "  " + hour_minute_second;

                                                    label = label + ' '
                                                        + context.formattedValue + ' records '
                                                        + 'at ' + timeString;
                                                    return label;
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
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
                                    <Option value="tnm">Tokyo National Museum</Option>
                                    <Option value="kyohaku">Kyoto National Museum</Option>
                                    <Option value="narahaku">Nara National Museum</Option>
                                    <Option value="kyuhaku">Kyushu National Museum</Option>
                                </Select>
                                <br></br>
                                <br></br>
                                <Button type="primary" onClick={(value) => {
                                    this.setState({
                                        loading: 1,
                                        update_museum: update_museum
                                    })
                                }} >Cập nhật</Button>
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