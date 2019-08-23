import React from 'react';
import './style.css';
import {Col, Row, Table} from "antd";
import Header from '../public/header/header.js';
import Provider from "../public/axios/provider";

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: text => <a>{text}</a>,
    width: '20%',
  },
  {
    title: 'Wins',
    dataIndex: 'wins',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Lost',
    dataIndex: 'lose',
    sorter: true,
    width: '20%',
  },
];


class ScoreBoard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        loading: true,
      };
    };

    componentDidMount() {
        Provider.get('http://127.0.0.1:8000/api/scores').then(response => {
            console.log(response.data)
            this.setState({
                data: response.data,
                loading: false
            })
        })
    };


    render() {
        return (
            <div>
              <Row>
                <Col><Header site='scoreBoard' /></Col>
              </Row>
              <Row className={'sky'} align={'middle'} justify={'center'}>
                <Col>
                  <Table
                    rowKey={row => row.name}
                    className={'margin-around'}
                    columns={columns}
                    dataSource={this.state.data}
                    loading={this.state.loading}
                    bordered={true}
                  />
                </Col>
              </Row>
            </div>
        )
    }
}

export default ScoreBoard;
