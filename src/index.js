import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "antd/dist/antd.css";
import * as serviceWorker from './serviceWorker';
import AppRouter from './router'

ReactDOM.render(<AppRouter />, document.getElementById('root'));
if (process.env.NODE_ENV === 'development') {
    require('./mock')
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
