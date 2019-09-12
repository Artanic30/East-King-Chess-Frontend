import {Menu, Dropdown, Icon, Button, notification} from 'antd';
import React from 'react';
import { Link } from 'react-router-dom'
import '../style.css';
import store from '../../public/store/UserInfo'
import Provider from '../../public/axios/provider'



class State extends React.Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    };

    handleMenuClick = (e) => {
        if (e.key === '2') {
            store.logout();
            Provider.get('http://127.0.0.1:8000/api/account/logout/').then(response => {
                notification.success({
                    message: 'Success!',
                    description: response.data.msg,
                    top: 65
                });
            })
        }
    };

    render() {
        return (
            <Dropdown overlay={menu(this.handleMenuClick)}>
                <Button type="primary" href="#" className={'state-button'}>
                    <span style={{color: 'white', paddingTop: '4px'}}>Account</span>
                    <Icon style={{color: 'white'}} type="down" />
                </Button>
            </Dropdown>
        )
    }
}

const menu = (click) => {
    return (
      <Menu onClick={click}>
        <Menu.Item key={1}>
            <Link to={'/profile/:user_id'}>
                <span>Profile</span>
            </Link>
        </Menu.Item>
        <Menu.Item key={2}>
            <span>Logout</span>
        </Menu.Item>
      </Menu>
    )
};

export default State;
