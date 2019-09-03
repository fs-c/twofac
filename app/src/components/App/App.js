import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../Home/Home';

import config from '../../../../.config.js';
import { getBaseName } from '../../helpers';

const App = () => {
    const basename = getBaseName();

    return (
        <Router basename={basename}>
            <Route exact path='/'>
                <Home />
            </Route>
        </Router>
    );
};

export default App;
export { config };
