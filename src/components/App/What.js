import React from 'react';

import Card from 'react-bootstrap/Card';

const What = () => {
    const authAbbr = <abbr title='Two-Factor Authentication' className='initialism'>2FA</abbr>;

    const links = {
        enableTwoFac: <a href='https://github.com/DoctorMcKay/node-steam-user#enabletwofactorcallback'>
            <code>enableTwoFactor</code>
        </a>,
        localStorage: <a href='https://en.wikipedia.org/wiki/Web_storage'>local storage</a>,
    };

    const textTwofac = <i className='color-rotating-inline'>twofac</i>;

    return (<>
        <p>
            <strong className='lead'>
                What does {textTwofac} do?
            </strong><br/>

            It generates 5-digit codes to be used when logging onto a Steam account 
            protected by the Steam Guard Mobile Authenticator, given the <i>shared 
            secret</i> belonging to said account.
        </p>

        <p>
            <strong className='lead'>
                What's a <i>shared secret</i>?
            </strong><br/>

            A <i>shared secret</i> is generated when enabling the Steam Guard 
            Mobile Authenticator and known both to the Steam servers and your 
            authenticator (hence, <i>shared</i>), which is usually your phone. 
            Alongside the current time, it is used to generate 
            Steam {authAbbr} codes. <i> Actually retrieving your shared secret 
            is out of the scope of this page, but {links.enableTwoFac} might help 
            you.</i>
        </p>

        <p>
            <strong className='lead'>
                What happens to my <i>shared secret</i>?
            </strong><br/>

            As a general rule, <strong>your secret <i>never</i> leaves your machine</strong>. 
            You can choose to save it alongside an <i>alias</i>, which will cause 
            it to be saved in the {links.localStorage} of your browser.
        </p>

        <Card text='light' border='warning' style={{ background: 'inherit' }}>
            <Card.Body>
                <Card.Text>
                    The security of the Steam Guard Mobile Authenticator depends on 
                    the secrecy of the shared key.
                </Card.Text>

                <Card.Text>
                    In other words, the security of your Steam account is usually 
                    tied to your mobile phone's. <strong>When using {textTwofac}, it 
                    hinges on the security of the device you use it with.</strong>
                </Card.Text>
            </Card.Body>
        </Card>
    </>);
};

export default What;
