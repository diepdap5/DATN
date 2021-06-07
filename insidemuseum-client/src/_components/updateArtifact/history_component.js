import React, { Component } from 'react';
import { Bar } from "react-chartjs-2";
import {Typography, Layout} from 'antd'
const { Title } = Typography;
const { Content } = Layout;

class HistoryComponent extends Component {

    render() {
        var timing_list = this.props.timing;
        return (<Content
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
                        "Bảo tàng Quốc gia Tokyo",
                        "Bảo tàng Quốc gia Kyoto",
                        "Bảo tàng Quốc gia Nara",
                        "Bảo tàng Quốc gia Kyushu",
                    ],
                    datasets: [
                        {
                            label: "Số lượng hiện vật",
                            backgroundColor: [
                                "#3e95cd",
                            ],
                            data: this.props.records_list
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

                                    var ISOTime = timing_list[museum]
                                    var year_month_date = ISOTime.split("T")[0];
                                    var hour_minute_second = ISOTime.split("T")[1];
                                    hour_minute_second = hour_minute_second.split(".")[0];
                                    var timeString = year_month_date + "  " + hour_minute_second;

                                    label = label + ' '
                                        + context.formattedValue + ' hiện vật '
                                        + 'cập nhật lúc ' + timeString;
                                    return label;
                                }
                            }
                        }
                    }
                }}
            />
        </Content>);
    }
}
export default HistoryComponent;