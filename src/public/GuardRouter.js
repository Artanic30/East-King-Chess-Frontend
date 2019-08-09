import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import store from './store/UserInfo';

class loginRequireRouter extends React.Component {
    render () {
        const props = this.props;
        return (
             <React.Fragment>
                 { store.is_auth ? <Route {...props} /> : <Redirect to={'/index'} /> }
             </React.Fragment>
        )
    }
}


export default loginRequireRouter;
