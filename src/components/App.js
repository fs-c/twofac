import React from 'react';

import { Switch, Route } from 'wouter';

const Home = () => (
    <p>
        Hello world
    </p>
);

const What = () => (
    <p>
        What?
    </p>
);

const Contact = () => (
    <p>
        Contact
    </p>
);

const NotFound = () => (
    <p>
        Not Found
    </p>
);

const App = () => (
    <Switch>
        <Route path='/' component={Home} />
        <Route path='/what' component={What} />
        <Route path='/contact' component={Contact} />

        <Route path='/:nonexistent*' component={NotFound} />
    </Switch>
);

export default App;
