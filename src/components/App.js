import React from 'react';

import Header from './Header';
import Footer from './Footer';
import CSSReset from './lib/CSSReset';
import { Container } from './lib/utils';
import { Switch, Route, Redirect } from 'wouter';

import Home from '../pages/Home';
import What from '../pages/What';
import Contact from '../pages/Contact';

import styled, { createGlobalStyle } from 'styled-components';

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

        --highlight: #FF0080;
    }

    body {
        color: var(--foreground);
        background-color: var(--background);

        /* Required for footer */
        min-height: 100vh;

        padding: 0 1em 0 1em;
    }

    * { outline-color: var(--highlight); }

    /* Required for footer */
    #root { min-height: inherit; }

    a {
        color: inherit
        text-decoration: underline;
    }

    a:hover {
        color: inherit;
        text-decoration: none;
    }
`;

/* Required for footer */
const GlobalContainer = styled(Container)`
    min-height: inherit;
`;

const App = () => (
    <>
        <CSSReset />
        <GlobalStyle />

        <GlobalContainer>
            <Header />

            <Switch>
                <Route path='/' component={Home} />
                <Route path='/what' component={What} />
                <Route path='/contact' component={Contact} />

                <Route path='/:nonexistent*'><Redirect to='/' /></Route>
            </Switch>

            <Footer />
        </GlobalContainer>
    </>
);

export default App;
