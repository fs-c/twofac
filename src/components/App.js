import React from 'react';

import { Switch, Route, Link } from 'wouter';

const Navigation = () => (
    <>
        <Link href='/'>twofac</Link>
        <Link href='/what?'>what?</Link>
        <Link href='/contact'>contact</Link>
    </>
);

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
    <>
        <Navigation />

        <Switch>
            <Route path='/' component={Home} />
            <Route path='/what' component={What} />
            <Route path='/contact' component={Contact} />

            <Route path='/:nonexistent*' component={NotFound} />
        </Switch>
    </>
);

export default App;
