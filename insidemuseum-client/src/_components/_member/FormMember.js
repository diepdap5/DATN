import React, { Component } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import {Select,DatePicker} from 'antd';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
function convertTime(inStr){
    var year = inStr.substring(0, 4);
    var month = inStr.substring(5, 7);
    var day = inStr.substring(8, 10);
    return month + '/' + day + '/' + year;
}


class FormMember extends Component {
    state = {
        id: "",
        name: "",
        createdAt: "",
        gender: "",
        bophan: "",
        chucvu: "",
        birthday: "",
        avatar: ""
    }

    handleChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleChangeGender = (value,e) => {
        this.setState({
            gender: value
        })
    }

    handleChangeWP = (value,e) => {
        this.setState({
            bophan: value
        })
    }

    handleChangeCompetence = (value,e) => {
        this.setState({
            chucvu: value
        })
    }
    handleChangeAvatar = (e) => {
        this.setState({
            avatar: e.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const mem = {
            id: this.props.id,
            name: this.state.name,
            birthday: this.state.birthday,
            chucvu: this.state.chucvu,
            bophan: this.state.bophan,
            gender: this.state.gender,
            avatar: this.state.avatar,
            createdAt: new Date().toLocaleString()
        };

        axios.post(`https://5ecdcfb77c528e00167cd7e5.mockapi.io/api/members`, mem)
            .then((res) => {
                // alert("success")
                this.props.addMember(mem)
                notification.open({
                    type: 'success',
                    message: 'Success',
                    description: 'add mem success!',
                    duration: 2
                });
                // this.props.turnOf()
            })
            .catch((err)=>{
                // alert("failed")
                notification.open({
                    type: 'error',
                    message: 'Add mem failed',
                    description: 'Please try again',
                    duration: 2
                });
            })
    }

    render() {
        return (
            <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish} >
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input onChange={this.handleChangeName}/>
                </Form.Item>
                <Form.Item name="gender" label="Gender">
                    <Select onSelect={(value, event) => this.handleChangeGender(value, event)}>
                        <Select.Option value="M">Male</Select.Option>
                        <Select.Option value="F">Female</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="chucvu" label="Competence " >
                    <Select onSelect={(value, event) => this.handleChangeCompetence(value, event)}>
                        <Select.Option value="Commander">Commander</Select.Option>
                        <Select.Option value="Worker">Worker</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="bophan" label="Work Part " >
                    <Select onSelect={(value, event) => this.handleChangeWP(value, event)}>
                        <Select.Option value="Network monitoring">Network monitoring</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="birthday" label="Birthday ">
                    <DatePicker format='DD/MM/YYYY' value={this.state.birthday} onChange={birthday => this.setState({ birthday: convertTime(birthday.toISOString().split("T")[0])  })}/>
                </Form.Item>
                <Form.Item name="image" label="Image link" >
                   <Input onChange={this.handleChangeAvatar} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" onClick = {this.handleSubmit}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default FormMember;

