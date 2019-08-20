import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GuardRoute from './public/GuardRouter'
import Index from './Chess/index.js'
import Register from './Chess/register'
import Profile from './Chess/profile'
import GameBoard from './Chess/gameboard'
import ScoreBoard from './Chess/scoreboard'
import Matching from './Chess/matching'



class AppRouter extends React.Component {
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
