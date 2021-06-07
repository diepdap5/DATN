import React, { Component } from 'react';
import { Layout } from 'antd'
import Carousel from 'react-bootstrap/Carousel'

const { Content } = Layout;

class CarouselComponent extends Component {
    render() {
        const carousel = [];
        if (this.props.artifact["image_files"] != null) {
            for (let i = 0; i < this.props.artifact["image_files"].length; i++) {
                var source = "data:image/jpg;base64," + this.props.artifact["image_files"][i];
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
        return (
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
        );
    }
}
export default CarouselComponent;