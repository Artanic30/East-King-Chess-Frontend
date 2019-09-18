import React from 'react';
import '../style.css';
import { Menu, Icon, Row, Col, Drawer, Button } from 'antd';
import { Link } from 'react-router-dom'
import LoginForm from './loginForm'
import store from '../store/UserInfo.js'
import LoginState from './loginstate'



class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.site,
            visible: false,
            auth: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
    };

    handleClick = e => {
        this.setState({
            current: e.key,
        });
    };

    showDrawer = () => {
        this.setState({
          visible: true,
        });
    };

    onClose = () => {
        this.setState({
          visible: false,
        });
    };

    componentWillMount() {
        console.log('header created', store.is_auth)
        this.setState({
            auth: store.is_auth
        })
    };


    render () {
        return (
            <Row>
                <Col>
                   <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" className={'theme-dark'}>
                        <Menu.Item key="index">
                            <Link to='/index'>
                                <Row>
                                    <Col span={6}><Icon type="dashboard" /></Col>
                                    <Col span={18}><h1>Index</h1></Col>
                                </Row>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="profile">
                            <Link to={'/profile/:user_id'}>
                                <Row>
                                    <Col span={6}><Icon type="idcard" /></Col>
                                    <Col span={18}><h1>Profile</h1></Col>
                                </Row>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="matching">
                            <Link to={'/matching'}>
                                <Row>
                                    <Col span={6}><Icon type="table" /></Col>
                                    <Col span={18}><h1>Matching</h1></Col>
                                </Row>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='scoreBoard'>
                            <Link to={'/scoreBoard'}>
                                <Row>
                                    <Col span={6}><Icon type="bars" /></Col>
                                    <Col span={18}><h1>ScoreBoard</h1></Col>
                                </Row>
                            </Link>
                        </Menu.Item>
                       { this.state.auth ?
                           <Menu.Item key={'login'} className={'login-button'}>
                               <LoginState />
                           </Menu.Item>
                           : <Menu.Item key='login' className={'login-button'}>
                            <Button type="primary" onClick={this.showDrawer} className={'header-button'}>
                              Login
                            </Button>
                            <Drawer
                              title="Login"
                              placement="top"
                              closable={false}
                              onClose={this.onClose}
                              visible={this.state.visible}
                              height={400}
                            >
                                <Row>
                                    <Col span={5} />
                                    <Col span={8}>
                                        <LoginForm closeDrawer={this.onClose} />
                                    </Col>
                                    <Col span={8} type={'flex'} justify={'center'} align={'center'}>
                                        <img src={require('../../assets/chess.jpg')} alt={''} className={'login-img'}/>
                                    </Col>
                                    <Col span={3} />
                                </Row>
                            </Drawer>
                       </Menu.Item> }

                    </Menu>
                </Col>
            </Row>
        )
    }
}

export default Header;
