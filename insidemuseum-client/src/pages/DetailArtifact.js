import React, { Component } from 'react';
import { Layout, Breadcrumb, Col, Row, Descriptions, Typography } from 'antd'; import { withRouter } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import axios from 'axios';
const { Content } = Layout;
const { Title } = Typography;

class DetailArtifact extends Component {
    state = {
        artifact: {},
    }
    componentDidMount() {
        const organization_item_key = this.props.match.params.organization_item_key;
        const organization_path_name = this.props.match.params.organization_path_name;

        axios.get(`http://localhost:3000/getById/` + organization_path_name + '/ja/' + organization_item_key, { crossDomain: true })
            .then(response => {
                var artifact;
                artifact = response.data;
                console.log(artifact)
                this.setState({ artifact });
            })
            .catch(error => console.log(error));

        
    }
    render() {
        const { artifact } = this.state;
        var organization_path_name = this.props.match.params.organization_path_name;
        switch (organization_path_name) {
            case 'tnm': organization_path_name = 'Tokyo National Museum'; break;
            case 'kyohaku': organization_path_name = 'Kyoto National Museum'; break;
            case 'kyuhaku': organization_path_name = 'Kyushu National Museum'; break;
            case 'narahaku': organization_path_name = 'Nara National Museum'; break;
            default: organization_path_name = ''
        };
        const organization_item_key = this.props.match.params.organization_item_key;
        const carousel = [];
        if (artifact["image_files"] != null) {
            for (let i = 0; i < artifact["image_files"].length; i++) {
                var source = "data:image/jpg;base64," + artifact["image_files"][i];
                carousel.push(
                    <Carousel.Item key={source}>
                        <img
                            className="d-block w-100"
                            src={source}
                            alt="First slide"
                        />
                    </Carousel.Item>);
            }
        }
        var description = '';
        if (this.state.artifact["descriptions"] != null) {
            description = this.state.artifact["descriptions"][0]["text"];
        }
        console.log(artifact);


        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Quản lý dữ liệu</Breadcrumb.Item>
                    <Breadcrumb.Item>{organization_path_name}</Breadcrumb.Item>
                    <Breadcrumb.Item>{organization_item_key}</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col span={12}>
                        <Content
                            style={{
                                padding: 20,
                                margin: 0,
                                minHeight: 800,
                                backgroundColor: 'white'
                            }}
                        >
                            <Carousel >
                                {carousel}
                            </Carousel>
                        </Content>
                    </Col>
                    <Col span={12}>
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
                            }}><Title level={2}>{artifact["title"]}</Title></div>
                            <div>
                            {description}
                            </div>
                            <br></br>
                            <Descriptions bordered column={1}>
                                <Descriptions.Item label="Loại tài sản văn hóa">{artifact["bunkazai"]}</Descriptions.Item>
                                <Descriptions.Item label="Thể loại">{artifact["bunrui"]}</Descriptions.Item>
                                <Descriptions.Item label="Niên đại">{artifact["jidai_seiki"]}</Descriptions.Item>
                                <Descriptions.Item label="Số lượng">{artifact["insuu"]}</Descriptions.Item>
                                <Descriptions.Item label="Tác giả">{artifact["sakusha"]}</Descriptions.Item>
                                <Descriptions.Item label="Quốc gia">{artifact["seisakuchi"]}</Descriptions.Item>
                                <Descriptions.Item label="Chất liệu">1{artifact["hinshitu_keijo"]}</Descriptions.Item>
                                <Descriptions.Item label="Kích thước">{artifact["houryo"]}</Descriptions.Item>
                                <Descriptions.Item label="Bảo tàng">{artifact["organization_title"]}</Descriptions.Item>
                            </Descriptions>
                        </Content>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default withRouter(DetailArtifact);