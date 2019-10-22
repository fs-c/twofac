import React from 'react';

import Navigation from './lib/Navigation';
import { Switch, Route } from 'wouter';
import { Container, VerticalSpacer } from './lib/utils';

import { createGlobalStyle } from 'styled-components';

const Header = () => (
    <>
        <VerticalSpacer height={5} />

        <Navigation>
            <Navigation.Main href='/'>twofac</Navigation.Main>
            <Navigation.Divider />
            <Navigation.Item href='/what?'>what?</Navigation.Item>
            <Navigation.Item href='/contact'>contact</Navigation.Item>
        </Navigation>

        <VerticalSpacer height={4} />
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

                <Route path='/:nonexistent*' component={NotFound} />
            </Switch>
        </Container>
    </>
);

export default App;
