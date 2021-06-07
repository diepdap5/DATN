import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { TeamOutlined, DashboardOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailArtifact from "./pages/DetailArtifact";
import UpdateArtifact from "./pages/UpdateArtifact";
import UpdateModel from "./pages/UpdateModel";

import './App.css';
const { SubMenu } = Menu;
const { Sider } = Layout;
class App extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path="/">
              <Layout>
                <Sider width={200} className="site-layout-background">
                  <Menu mode="inline" defaultSelectedKeys={['data-management']} defaultOpenKeys={['data-management']} style={{ height: '100%', borderRight: 0 }}>
                    <SubMenu key="data-management" icon={<DashboardOutlined />} title="Quản lý dữ liệu">
                      <Menu.Item key="alldata"><Link to="/">Tổng hợp</Link></Menu.Item>
                      <Menu.Item key="updatedata"><Link to="/update_data">Cập nhật dữ liệu</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="updatemodel" icon={<TeamOutlined />}><Link to="/update_model">Quản lý mô hình</Link></Menu.Item>
                  </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                  <Route exact path="/">
                    <Dashboard />
                  </Route>
                  <Route exact path="/details/:organization_path_name/:organization_item_key">
                    <DetailArtifact />
                  </Route>
                  <Route exact path="/update_data">
                    <UpdateArtifact />
                  </Route>
                  <Route exact path="/update_model">
                    <UpdateModel />
                  </Route>
                </Layout>
              </Layout>
            </Route>
          </Switch>

          {/* <Footer style={{ textAlign: 'center' }}>© Design Team: HI_08</Footer> */}
        </Layout>
      </Router>

    );
  }
}


export default App;