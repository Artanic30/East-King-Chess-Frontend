import React from 'react';
import './style.css';
import {Col, Row, Button, Spin, notification} from "antd";
import Header from '../public/header/header.js'
import Provider from '../public/axios/provider'


class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            resp: false,
            msg: 'original value!'
        };
        this.match = this.match.bind(this);
        this.getTips = this.getTips.bind(this);
    }

    componentWillMount() {
        const msg = [
            'Opponent found!',
            'Preparing the chess table....',
            'Filling up the gaslight....',
            'Inviting audience with a cup of coffee...'
        ];
        let iter = 0;
        setInterval(() => {
            iter += 1;
            if (iter > 3) {
                iter = 0
            }
            this.setState({
                msg: msg[iter]
            })
        }, 4000)
    }

    match = () => {
        this.setState({
            loading: true
        });
        let intervalMatch = setInterval(() => {
             Provider.get('http://127.0.0.1:8000/api/match/init').then(response => {
                if (response.data.msg === 'success') {
                    setTimeout(() => {
                        this.setState({
                            resp: true
                        });
                    }, 2000);

                    notification.success({
                        message: 'Result',
                        description: response.data.msg,
                        top: 65
                    });
                    setTimeout(() => {
                        this.props.history.push('/gameBoard')
                    }, 10000)
                } else if (response.data.msg === 'pending') {
                } else {
                    notification.error({
                        message: 'Fail!',
                        description: response.data.msg,
                        top: 65
                      });
                    clearInterval(intervalMatch);
                }
            })
        }, 1000);
    };

    getTips = () => {
        if (this.state.resp) {
            return this.state.msg
        } else {
            return 'Finding opponents....'
        }
    };


    render() {
        return (
            <div>
              <Row>
                <Col><Header site='matching' /></Col>
              </Row>
                <Row>
                    <Col>
                        <Spin spinning={this.state.loading} tip={this.getTips()} size={'large'}>
                            <Row>
                                <Col offset={10} className={'margin-top'}>
                                    <h1>寻找旗鼓相当的对手</h1>
                                </Col>
                              </Row>
                              <Row>
                                <Col offset={8}>
                                    <img alt="example" src={require('../assets/chess.jpg')} className={'match-img'}/>
                                </Col>
                              </Row>
                              <Row>
                                <Col offset={10} className={'margin-top'}>
                                  <Button type="primary" size='large' className={'match-button'} onClick={this.match}>Start Matching!</Button>
                                </Col>
                              </Row>
                        </Spin>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default ScoreBoard;
