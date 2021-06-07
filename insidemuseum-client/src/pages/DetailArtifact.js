import React, { Component } from 'react';
import { Breadcrumb, Col, Row } from 'antd';
import { withRouter } from 'react-router-dom';
import DetailComponent from "../_components/detailArtifact/detail_component" 
import CarouselComponent from "../_components/detailArtifact/carousel_component"
import axios from 'axios';

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
        
        
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Quản lý dữ liệu</Breadcrumb.Item>
                    <Breadcrumb.Item>{organization_path_name}</Breadcrumb.Item>
                    <Breadcrumb.Item>{organization_item_key}</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col span={12}>
                        <CarouselComponent artifact={artifact} />
                    </Col>
                    <Col span={12}>
                        <DetailComponent artifact={artifact} />
                    </Col>
                </Row>
            </div>
        );
    }
}


export default withRouter(DetailArtifact);