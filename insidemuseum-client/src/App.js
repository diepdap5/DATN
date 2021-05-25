import React, { Component } from 'react';
import { Layout, Menu, Modal, Collapse } from 'antd';
import { TeamOutlined, DashboardOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import MemberProfile from "./_components/_member/MemberProfile";
import './App.css';

const { Sider, Footer } = Layout;
const { Panel } = Collapse;
function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

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
                  <Menu mode="inline" defaultSelectedKeys={['dashboard']} defaultOpenKeys={['dashboard']} style={{ height: '100%', borderRight: 0 }}>
                    <Menu.Item key="dashboard" icon={<DashboardOutlined />}><Link to="/">Dashboard</Link></Menu.Item>
                    <Menu.Item key="members" icon={<TeamOutlined />}><Link to="/members">Members</Link></Menu.Item>
                  </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                  <Route exact path="/">
                    <Dashboard />
                  </Route>
                  <Route exact path="/members">
                    <Members />
                  </Route>
                  <Route exact path="/members/profile/:id">
                    <MemberProfile />
                  </Route>
                </Layout>
              </Layout>
            </Route>
          </Switch>

          <Footer style={{ textAlign: 'center' }}>©Design Team: HI_08</Footer>
        </Layout>
        <div>
          <Modal
            title="Help"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Collapse onChange={callback}>
              <Panel header="Location" key="1">
                <ul>
                  <li><h4>View</h4>{text}</li>
                  <li><h4>Hover to drone</h4>{text}</li>
                  <li><h4>Click to drone</h4>{text}</li>
                </ul>
              </Panel>
              <Panel header="Drones" key="2">
                <ul>
                  <li><h4>View all</h4>{text}</li>
                  <li><h4>Search drone</h4>{text}</li>
                  <li><h4>Add drone</h4>{text}</li>
                </ul>
              </Panel>
              <Panel header="Members" key="3">
                <ul>
                  <li><h4>View all</h4>{text}</li>
                  <li><h4>Search member</h4>{text}</li>
                  <li><h4>Add member</h4>{text}</li>
                </ul>
              </Panel>
              <Panel header="Raw Data Analysis" key="4">
                <ul>
                  <li><h4>Filter Data</h4>{text}</li>
                  <li><h4>Process Data</h4>{text}</li>
                  <li><h4>Delete Data</h4>{text}</li>
                </ul>
              </Panel>
            </Collapse>
          </Modal>
        </div>
      </Router>

    );
  }
}


export default App;