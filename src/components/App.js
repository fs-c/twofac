import React from 'react';

import Header from './Header';
import { Container } from './lib/utils';
import { Switch, Route, Redirect } from 'wouter';

import Home from '../pages/Home';
import What from '../pages/What';
import Contact from '../pages/Contact';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        --background: #000000;
        --foreground: #ffffff;

        --accents-8: #fafafa;
        --accents-7: #eaeaea;
        --accents-6: #999999;
        --accents-5: #888888;
        --accents-4: #666666;
        --accents-3: #444444;
        --accents-2: #333333;
        --accents-1: #111111;
    }

    body {
        color: var(--foreground)!important;
        background-color: var(--background)!important;
    }

    a { color: inherit }
    a:hover {
        color: inherit;
        text-decoration: none;
    }
`;

const App = () => (
    <>
        <GlobalStyle />

        <Container>
            <Header />

            <Switch>
                <Route path='/' component={Home} />
                <Route path='/what' component={What} />
                <Route path='/contact' component={Contact} />

                <Route path='/:nonexistent*'><Redirect to='/' /></Route>
            </Switch>
        </Container>
    </>
);

export default App;
