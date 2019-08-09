import React from 'react';
import './style.css';
import {Col, Row, Card} from "antd";
import Header from '../public/header/header.js'
import ReForm from './registerForm'


class Register extends React.Component {
    render() {
        return (
            <div>
              <Row>
                <Col><Header site='index' /></Col>
              </Row>
              <Row className={'sky'}>
                  <Col span={10} offset={7}>
                      <Card className={'register-card'}>
                        <ReForm />
                      </Card>
                  </Col>
              </Row>
            </div>
        )
    }
}
export default Register;
