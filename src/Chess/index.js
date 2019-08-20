import React from 'react';
import './style.css';
import Header from '../public/header/header.js'
import {Col, Row, Card, Carousel} from "antd";


const { Meta } = Card;
const Description = '东皇棋是源自于公元前2000年古埃及文明创始后的四千年由一位来自古中国的传人发明';
const Rules = '东皇棋游戏规则：出现连续相邻的三个子判负，无论方向是正方向或斜方向。三个子以上相邻则判定胜利';
const Nowadays = '东皇棋如今流行于上海某高校大一新生之中，按寝室不同分为武当派，峨眉派以及华山派，各派均有身怀绝技的掌门人';


class Index extends React.Component {
    constructor (props) {
        super(props);
        this.mainCarousel = React.createRef();
        this.sideCarouselOne = React.createRef();
        this.sideCarouselTwo = React.createRef();
        this.onChange = this.onChange.bind(this);
        this.getCards = this.getCards.bind(this);
    };

    getCards = (myRef, style, is_dots, after=undefined) => {
        return (
            <Carousel afterChange={after} ref={myRef} className={style} dots={is_dots}>
                <div>
                    <Card hoverable cover={<img alt="example" src={require('../assets/chess.jpg')}/>}>
                        <Meta title="东皇棋" description={Description}/>
                    </Card>
                </div>
                <div>
                    <Card hoverable cover={<img alt="example" src={require('../assets/chess.jpg')} />}>
                        <Meta title="游戏规则" description={Rules}/>
                    </Card>
                </div>
                <div>
                    <Card hoverable cover={<img alt="example" src={require('../assets/chess.jpg')} />}>
                        <Meta title="流传现状" description={Nowadays}/>
                    </Card>
                </div>
            </Carousel>
        )
    };


    onChange = (index) => {
        this.sideCarouselOne.current.slick.slickGoTo(index);
        this.sideCarouselTwo.current.slick.slickGoTo(index);
    };

    render () {
        return (
            <React.Fragment>
                  <Row>
                    <Col><Header site='index' /></Col>
                  </Row>
                  <Row className={'index-background'}>
                    <Col span={8}>
                       {this.getCards(this.sideCarouselOne, 'side-carouselOne', false)}
                    </Col>
                    <Col span={8}>
                        {this.getCards(this.mainCarousel, 'main-carousel', true, this.onChange)}
                    </Col>
                    <Col span={8}>
                      {this.getCards(this.sideCarouselTwo, 'side-carouselTwo', false)}
                    </Col>
                  </Row>
            </React.Fragment>
        )
      }
    }

export default Index;
