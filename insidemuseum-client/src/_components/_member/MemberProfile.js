import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb,Row, Col, Avatar } from 'antd';
import axios from 'axios';

class MemberProfile extends Component {
    state = {
        members: []
    }

    componentDidMount() {
        axios.get(`https://5ecdcfb77c528e00167cd7e5.mockapi.io/api/members`)
        .then(response => {
            const members = response.data;
            this.setState({ members });
        })
        .catch(error => console.log(error));
    }
   
    render() {
        const { members} = this.state;
        const user_id = this.props.match.params.id;
        // var user_name = members.map(function (mem) {
        //     if (mem.id===user_id) {return mem.name;}
        // });
        // var user_avatar = members.map(function (mem) {
        //     if (mem.id===user_id) {return mem.avatar;}
        // });
        // // var x = `https://unsplash.it/50?image=1`
        // var x = Object.values(user_avatar)
        // var user_birthday = members.map(function (mem) {
        //     if (mem.id===user_id) {return mem.birthday;}
        // });
        // var user_gender = members.map(function (mem) {
        //     if (mem.id===user_id) {return mem.gender;}
        // });
        // var user_chucvu = members.map(function (mem) {
        //     if (mem.id===user_id) {return mem.chucvu;}
        // });
        // var user_bophan = members.map(function (mem) {
        //     if (mem.id===user_id) {return mem.bophan;}
        // });
        var i=0;

        for(i=0; i < members.length; i++){
            if(members[i].id === user_id){
                var user_name = members[i].name;
                var user_gender = members[i].gender;
                var user_avatar = members[i].avatar;
                var user_birthday = members[i].birthday;
                var user_bophan = members[i].bophan;
                var user_chucvu = members[i].chucvu;
            }
        }

        return(
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Drone Management</Breadcrumb.Item>
                    <Breadcrumb.Item>Members</Breadcrumb.Item>
                    <Breadcrumb.Item>Profile</Breadcrumb.Item>
                </Breadcrumb>
                <br></br>
                <br></br>
                    <Row>
                        <Col flex={2} align="middle">
                            <Avatar size={220} src={user_avatar} />
                        </Col>
                        <Col flex={3}>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{ width: "200px" }}> <h2>Name: </h2> </td>
                                    <td> </td>
                                    <td style={{ textAlign: 'right' }}><h3>{user_name}</h3></td>
                                </tr>
                                <tr>
                                    <td> <h2>Birthday: </h2></td>
                                    <td> </td>
                                    <td style={{ textAlign: 'right' }}> <h3>{user_birthday}</h3></td>
                                </tr>
                                <tr>
                                    <td> <h2>Gender: </h2></td>
                                    <td> </td>
                                    <td style={{ textAlign: 'right' }}><h3>{user_gender}</h3></td>
                                </tr>
                                <tr>
                                    <td> <h2>Competence: </h2></td>
                                    <td> </td>
                                    <td style={{ textAlign: 'right' }}><h3>{user_chucvu}</h3></td>
                                </tr>
                                <tr>
                                    <td> <h2>Working Parts: </h2></td>
                                    <td> </td>
                                    <td style={{ textAlign: 'right' }}><h3>{user_bophan}</h3></td>
                                </tr>
                            </tbody>
                        </table>
                        </Col>
                    </Row>
            </div>
        );
    }
}

export default withRouter(MemberProfile);