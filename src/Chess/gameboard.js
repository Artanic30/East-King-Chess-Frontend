import React from 'react';
import './style.css';
import Header from '../public/header/header.js'
import {Row, Col, Card, Button, notification} from 'antd';
import Provider from "../public/axios/provider";


class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [
                {
                    name: 'one'
                },
                {
                    name: 'two'
                }
            ],
            endFame: false,
            rotating: true,
            chessBoard: new Array(5).fill(new Array(5).fill(''))
        };
        this.getPlayerInfo = this.getPlayerInfo.bind(this);
        this.clickChess = this.clickChess.bind(this);
        this.Lunxun = this.Lunxun.bind(this);
    };

    componentDidMount() {
        // Acquire players' information
        Provider.get(`http://127.0.0.1:8000/api/players/${this.props.match.params.board_id}`).then(response => {
            if (response.data.msg === 'success') {
                this.setState({
                    players: response.data.players
                });
                notification.success({
                    message: 'Success!',
                    description: 'Game is ready to begin!',
                    top: 65
                });
            } else {
                notification.error({
                    message: 'Fail!',
                    description: response.data.msg,
                    top: 65
                });
                setTimeout(() => {
                    this.props.history.push('/matching')
                }, 3000)
            }

        });
        // acquire initial chessBoard
        this.Lunxun().start();
        this.Lunxun().interval();
        setInterval(() => {
           this.setState({
               rotating: !this.state.rotating
           })
        }, 2000)
    };
    // todo: stop the interval!!!!
    Lunxun = () => {
        let a = function() {};
        let start = () => {
            a = setInterval(() => {
                if (!this.state.endGame) {
                    Provider.get(`http://127.0.0.1:8000/api/${this.props.match.params.board_id}`).then(response => {
                        if (response.data.msg === 'success') {
                            this.setState({
                                chessBoard: response.data.board
                            });
                        }
                        else if (response.data.msg !== 'end') {
                            notification.error({
                                message: 'Fail!',
                                description: response.data.msg,
                                top: 65
                            });
                            setTimeout(() => {
                                this.props.history.push('/matching')
                            }, 5000)
                        } else {
                            notification.info({
                                message: 'Result!',
                                description: response.data.board,
                                top: 65,
                                duration: 10000
                            });
                            this.setState({
                                endGame: true,
                            });
                            this.Lunxun().end();
                        }
                    });
                }
            }, 1000);
        };
        let end = () => {
            clearInterval(a)
        };
        return {
            start: start,
            end: end,
            interval: a
        }
    };


    getPlayerInfo = (player, rotating, order) => {
        return (
            <React.Fragment>
                <Row type={'flex'} justify={'center'}>
                    <Col>
                        {rotating ?
                             <img alt="Loading..." style={{ transform: 'rotateY(180deg)' }} src={require("../assets/userImage.jpg")} className={'bigSmile'} />
                             :
                             <img alt="Loading..." src={require("../assets/userImage.jpg")} className={'bigSmile'} />
                        }
                    </Col>
                </Row>
                <Row className={'space-around'}>
                    <Col>
                        { order === 1 ? <h1>Player  ×: </h1> : <h1>Player  ⚪: </h1>}
                    </Col>
                </Row>
                <Row className={'space-around'}>
                    <Col>
                        <h2>{ player }</h2>
                    </Col>
                </Row>
            </React.Fragment>
        )
    };

    clickChess = (row, col) => {
        if (!this.state.endGame) {
            let data = new FormData();
            data.append('row', row);
            data.append('col', col);
            Provider.post(`http://127.0.0.1:8000/api/update/${this.props.match.params.board_id}`, data).then((response) => {
            if (response.data.msg === 'no') {
                // players' illegal move
                notification.error({
                    message: 'Operation fail',
                    description: 'You can not make that move!',
                    top: 65
                });
            } else if (response.data.msg === 'NA') {
                // Game go on
                this.setState({
                    chessBoard: response.data.matrix
                });
            } else {
                // We got a winner or game board lost in backend
                notification.info({
                    message: 'Result',
                    description: response.data.msg,
                    top: 65
                });
                this.setState({
                    endGame: true,
                });
                this.Lunxun().end();
            }
            }).catch((err) => {
                notification.error({
                    message: 'Oops..',
                    description: '获取信息失败，请检查你的网络',
                    top: 65
                });
            })
        }
        /*
        change a single value in matrix
        let result = 'changed'
        this.setState({
            chessBoard: this.state.chessBoard.map((arr, state_row) => state_row === row ? {...arr, [col]: result} : arr )
        })
        */
    };

    render() {
        const chessBoard = this.state.chessBoard.map(arr => {
                return arr.map(chess => {
                    switch (chess) {
                        case 1:
                            return "×";
                        case -1:
                            return "⚪";
                        case 0:
                            return '';
                        default:
                            return ''
                    }
            })
        });
        const length = new Array(5).fill('');
        return (
            <div>
                <Row>
                    <Col><Header site='gameBoard' /></Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <div className={'side-bar'}>
                            { this.getPlayerInfo(this.state.players[0].name, this.state.rotating, 1) }
                         </div>
                    </Col>
                    <Col span={16}>
                        <Card className={'sky'}>
                            { length.map((item, indexRow) => {
                                return (
                                    <Row className={`no-wrap`} type={'flex'} justify={'center'} key={`${indexRow}`}>
                                        {
                                            length.map((item, indexCol) => {
                                                return (
                                                    <Col key={`${indexRow}/${indexCol}`}>
                                                        <Button className={'chessButton'} onClick={this.clickChess.bind(this, indexRow, indexCol)}>
                                                            <h2 style={{fontSize: '60px'}}>{chessBoard[indexRow][indexCol]}</h2>
                                                        </Button>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                )
                            })}
                        </Card>
                    </Col>
                    <Col span={4}>
                         <div className={'side-bar'}>
                            { this.getPlayerInfo(this.state.players[1].name, !this.state.rotating, 2) }
                         </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default GameBoard;
