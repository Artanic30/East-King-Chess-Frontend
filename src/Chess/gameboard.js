import React from 'react';
import './style.css';
import Header from '../public/header/header.js'
import {Row, Col, Card, Button, notification} from 'antd';
import Provider from "../public/axios/provider";


class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerOne: 'test_nameOne',
            playerTwo: 'test_nameTwo',
            endFame: false,
            chessBoard: new Array(5).fill(new Array(5).fill(''))
        };
        this.getPlayerInfo = this.getPlayerInfo.bind(this);
        this.clickChess = this.clickChess.bind(this);
    };

    componentDidMount() {
        Provider.get('http://127.0.0.1:8000/api').then(response => {
            this.setState({
                    chessBoard: response.data.board
            });
        })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps, prevState, snapshot)
    };

    getPlayerInfo = (player) => {
        return (
            <React.Fragment>
                <Row type={'flex'} justify={'center'}>
                    <Col>
                        <img alt="Loading..." src={require("../assets/userImage.jpg")} className={'bigSmile'} />
                    </Col>
                </Row>
                <Row className={'space-around'}>
                    <Col>
                        <h1>Player:</h1>
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
            Provider.post(`http://127.0.0.1:8000/api/update`, {
                row: row,
                col: col,
            }).then((response) => {
            console.log(response);
            if (response.data.msg === 'no') {
                notification.error({
                message: 'Operation fail',
                description: 'You can not make that move!',
            });
            }
            if (response.data.msg === 'NA') {
                this.setState({
                    chessBoard: response.data.matrix
            });
            } else {
                notification.error({
                message: 'Result',
                description: response.data.msg,
            });
                this.setState({
                    endGame: true,
                })
            }
            }).catch((err) => {
                notification.error({
                    message: 'Oops..',
                    description: '获取信息失败，请检查你的网络',
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
                            { this.getPlayerInfo(this.state.playerOne) }
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
                            { this.getPlayerInfo(this.state.playerTwo) }
                         </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default GameBoard;
