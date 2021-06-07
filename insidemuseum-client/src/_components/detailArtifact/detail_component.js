import React, { Component } from 'react';
import { Typography, Layout, Descriptions } from 'antd'
const { Title } = Typography;
const { Content } = Layout;

class DetailComponent extends Component {
    render() {
        var description = '';
        if (this.props.artifact["descriptions"] != null) {
            description = this.props.artifact["descriptions"][0]["text"];
        }
        return (
            <Content
                style={{
                    padding: 20,
                    margin: 0,
                    minHeight: 800,
                    backgroundColor: 'white'
                }}
            >
                <div style={{
                    textAlign: 'center'
                }}><Title level={2}>{this.props.artifact["title"]}</Title></div>
                <div>
                    {description}
                </div>
                <br></br>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Loại tài sản văn hóa">{this.props.artifact["bunkazai"]}</Descriptions.Item>
                    <Descriptions.Item label="Thể loại">{this.props.artifact["bunrui"]}</Descriptions.Item>
                    <Descriptions.Item label="Niên đại">{this.props.artifact["jidai_seiki"]}</Descriptions.Item>
                    <Descriptions.Item label="Số lượng">{this.props.artifact["insuu"]}</Descriptions.Item>
                    <Descriptions.Item label="Tác giả">{this.props.artifact["sakusha"]}</Descriptions.Item>
                    <Descriptions.Item label="Quốc gia">{this.props.artifact["seisakuchi"]}</Descriptions.Item>
                    <Descriptions.Item label="Chất liệu">{this.props.artifact["hinshitu_keijo"]}</Descriptions.Item>
                    <Descriptions.Item label="Kích thước">{this.props.artifact["houryo"]}</Descriptions.Item>
                    <Descriptions.Item label="Bảo tàng">{this.props.artifact["organization_title"]}</Descriptions.Item>
                </Descriptions>
            </Content>
        );
    }
}
export default DetailComponent;