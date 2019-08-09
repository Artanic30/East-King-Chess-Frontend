import React from 'react';
import './style.css';
import {Col, Row} from "antd";
import Header from '../public/header/header.js'


class ScoreBoard extends React.Component {
    render() {
        return (
            <div>
              <Row>
                <Col><Header site='scoreBoard' /></Col>
              </Row>
              <Row>
                <Col>
                  <h1>scoreBoard</h1>
                </Col>
              </Row>
            </div>
        )
    }
}
export default ScoreBoard;
