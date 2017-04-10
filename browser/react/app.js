import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import store from './redux/store';
// import Container from './container';
import Board from './components/Board';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path="/" component={Board} />
        </Router>
    </Provider>,
    document.getElementById('game')
)