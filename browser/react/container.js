import React from 'react';
import {connect} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// components
import Board from './components/board';

const Routes = ({/* put onenter data funcs here */}) => (
    <Router history={browserHistory}>
        <Route path="/" component={Board} /*onEnter={}*/ />
    </Router>
)
            // <IndexRoute component={Board} />
            // <Route path="/" component={Board} />

const mapStateToProps = (store) => {
    return {}
};
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
