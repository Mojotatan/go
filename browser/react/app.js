import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import store from './redux/store';
// import Container from './container';
import Board from './components/Board';
import Lobby from './components/Lobby';

// path structure for client-side components
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path="/" component={Lobby} />
            <Route path="/go" component={Board} />
        </Router>
    </Provider>,
    document.getElementById('game')
)