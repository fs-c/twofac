import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import Home from '../Home/Home';

import { getBaseName } from '../../helpers';

const Navbar = ({ fancy = false }) => {
    return (
        <p className='pb-3'>
            <a href='/'>
                <strong className={`color-rotating-${fancy ? 'block' : 'inline'} font-italic`}>
                    twofac
                </strong>
            </a>

            <span className='text-muted float-right'>
                <a href='/what?'>/what?</a> <a href='/contact'>/contact</a>
            </span>
        </p>
    );
};

const App = () => {
    const basename = getBaseName();

    return (<>
        <div className='h-100 pt-3 pt-md-5 pb-6'>
            <Container>
                <Router basename={basename}>
                    <Route exact path='/' component={Home} />

                    <Route path='/what' component={What} />

                    <Route path='/contact' component={Contact} />
                </Router>
            </Container>
        </div>

        <footer id='footer' className='text-muted text-center my-5 pt-2'>
            <Container>
                <p>
                    Provided for free and fun by <a href='https://fsoc.space/' className='color-rotating-underline'>fsoc</a>.<br/>
                    Find the code on <a href='https://github.com/LW2904/twofac' className='color-rotating-underline'>github</a>.
                </p>
            </Container>
        </footer>
    </>);
};

const What = () => {
    return (<>
        <Navbar />

        <p>
            <strong className='lead'>
                What does <i className='color-rotating-inline'>twofac</i> do?
            </strong><br/>

            It generates 5-digit codes to be used when logging onto a Steam account 
            protected by the Steam Guard Mobile Authenticator, given the <i>shared secret</i> belonging 
            to said account.
        </p>

        <p>
            <strong className='lead'>
                What's a <i>shared secret</i>?
            </strong><br/>

            It's generated when enabling the Steam Guard Mobile Authenticator 
            and known both to the Steam servers and your authenticator (hence, <i>shared</i>), 
            which is usually your phone. Alongside the current time, it is used to 
            generate Steam <abbr title='Two-Factor Authentication' className='initialism'>2FA</abbr> codes.{' '}
            <i>
                Actually retrieving your shared secret is out of the scope of this 
                page, but <a href='https://github.com/DoctorMcKay/node-steam-user#enabletwofactorcallback'><code>enableTwoFactor</code></a> might 
                help you.
            </i>
        </p>

        <p>
            <strong className='lead'>
                What happens to my <i>shared secret</i>?
            </strong><br/>

            As a general rule, <strong>your secret <i>never</i> leaves your machine</strong>. You can 
            choose to save it alongside an <i>alias</i>, which will cause it to be saved 
            in the <a href='https://en.wikipedia.org/wiki/Web_storage'>local storage</a> of 
            your browser.
        </p>

        <Card text='light' border='warning' style={{ background: 'inherit' }}>
            <Card.Body>
                <Card.Text>
                    The security of the Steam Guard Mobile Authenticator depends on 
                    the secrecy of the shared key.
                </Card.Text>

                <Card.Text>
                    In other words, the security of your Steam account is usually 
                    tied to your mobile phone's. <strong>When using <i className='color-rotating-inline'>twofac</i>, it 
                    hinges on the security of the device you use it with.</strong>
                </Card.Text>
            </Card.Body>
        </Card>
    </>);
};

const Contact = () => {
    return (<>
        <Navbar />

        <p>
            You can reach me via email at <a href='mailto:root@fsoc.space'>root@fsoc.space</a>. 
            If email is not your thing, feel free to add <a href='https://steamcommunity.com/id/f50c'>steam/f50c</a> for 
            a quick response.
        </p>
        
        <p>
            For bug reports, feature requests or other contributions, 
            please <a href='https://github.com/LW2904/twofac/issues'>create an issue</a> on github.
        </p>
    </>)
};

export default App;
export { Navbar };
