import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GuardRoute from './public/GuardRouter'
import Provider from './public/axios/provider'
import { notification } from "antd";
import store from './public/store/UserInfo'
import Index from './Chess/index.js'
import Register from './Chess/register'
import Profile from './Chess/profile'
import GameBoard from './Chess/gameboard'
import ScoreBoard from './Chess/scoreboard'
import Matching from './Chess/matching'



class AppRouter extends React.Component {
    componentWillMount() {
        Provider.get(`http://127.0.0.1:8000/api/init`).then(response => {
            if (response.data.state) {
                store.login(true);
                notification.success({
                    message: 'Success!',
                    description: '您已经登陆！',
                    top: 65
                });
            }
        })
    }

    render () {
        return (
            <Router>
                <Switch>
                    <Route path='/index' component={Index} />
                    <Route path='/register' component={Register} />
                    <GuardRoute path='/profile/:user_id' component={Profile} />
                    <GuardRoute path='/gameBoard' component={GameBoard} />
                    <GuardRoute path='/Matching' component={Matching} />
                    <GuardRoute path='/scoreBoard' component={ScoreBoard} />
                    <Route component={Index} />
                </Switch>
            </Router>
        )
    }
}


export default AppRouter;
