import React from 'react';
import './style.css';
import { Col, Row, Card, Icon, Descriptions, notification } from "antd";
import Header from '../public/header/header.js'
import Provider from '../public/axios/provider'

class Profile extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            check_self: false,
            nickname: 'testName',
            games: 200,
            rank: 25,
            email: '',
            remark: 'test_remark test_remarktest_remark test_remarktest_remark test_remarktest_remark'
        };
        this.edit = this.edit.bind(this);
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
        this.smile = this.smile.bind(this);
    };
    componentWillMount () {
        // check whether the user owns the profile
        Provider.get(`http://127.0.0.1:8000/api/profile/${this.props.match.params.user_id}`).then(response => {
            console.log(response)
            this.setState({
                nickname: response.data.nickname,
                games: response.data.games,
                rank: response.data.rank,
                remark: response.data.remark,
                email: response.data.email,
                check_self: response.data.check
            })
        }).catch((err) => {
                notification.error({
                    message: 'Oops...',
                    description: '获取信息失败，请检查你的网络',
                    top: 65
                });
            })
    };

    edit = (e) => {
        e.preventDefault();
        console.log('editing!')
    };

    smile = (e) => {
        e.preventDefault();
        console.log('smiling!')
    };

    like = (e) => {
        e.preventDefault();
        console.log('like!')
    };

    dislike = (e) => {
        e.preventDefault();
        console.log('dislike!')
    };

    render() {
        return (
            <div className={'sky'}>
              <Row>
                <Col><Header site='profile' /></Col>
              </Row>
              <Row className={'margin-top'}>
                <Col span={8}/>
                <Col span={8}>
                  <Card
                    style={{ width: 600 }}
                    cover={
                      <img
                        style={{ height: '400px'}}
                        alt="example"
                        src={require('../assets/userImage.jpg')}
                      />
                    }
                    actions={
                        [   <Icon type="like" onClick={this.like}/>,
                            <Icon type="dislike" onClick={this.dislike}/>,
                            this.state.check_self ? ( <Icon type="edit" onClick={this.edit} />) : (<Icon type="smile" onClick={this.smile} /> )
                        ]
                    }
                  >
                    <Descriptions title="Profile">
                        <Descriptions.Item label="UserName">{this.state.nickname}</Descriptions.Item>
                        <Descriptions.Item label="Games">{this.state.games}</Descriptions.Item>
                        <Descriptions.Item label="Rank">{this.state.rank}</Descriptions.Item>
                        <Descriptions.Item label="Remark">{this.state.remark}</Descriptions.Item>
                        <Descriptions.Item label="Email">{this.state.email}</Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
                <Col span={8}/>
              </Row>
            </div>
        )
    }
}
export default Profile;
