import React, { useState } from 'react';

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
        --error: #E60000;
        --highlight: #FF0080;
    }

    ${({ theme }) => theme === 'light' ? (`
        :root {
            --background: #ffffff;
            --foreground: #000000;

            --accents-1: #fafafa;
            --accents-2: #eaeaea;
            --accents-3: #999999;
            --accents-4: #888888;
            --accents-5: #666666;
            --accents-6: #444444;
            --accents-7: #333333;
            --accents-8: #111111;
        }
    `) : (`
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
    `)}

    ::selection {
        background-color: var(--highlight);
    }

    body {
        color: var(--foreground);
        background-color: var(--background);

        /* Required for footer */
        min-height: 100vh;

        padding: 0 1em 0 1em;

        /* For the theme switch */
        transition: 0.25s;
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

const App = () => {
    const [ theme, setTheme ] = useState(localStorage.getItem('theme') || 'light');

    const onThemeSwitch = () => {
        setTheme((t) => {
            const newTheme = t === 'light' ? 'dark' : 'light';

            localStorage.setItem('theme', newTheme);

            return newTheme;
        });
    };

    return (
        <>
            <CSSReset />
            <GlobalStyle theme={theme} />
    
            <GlobalContainer>
                <Header onThemeSwitch={onThemeSwitch} />
    
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
};

export default App;
