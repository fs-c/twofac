import React from 'react';

import { Card, RunningText } from '../components/lib/utils';

import styled from 'styled-components';

const links = {
    enable: 'https://github.com/DoctorMcKay/node-steam-user#enabletwofactorcallback',
    storage: 'https://en.wikipedia.org/wiki/Web_storage',
};

const QA = ({ question, children }) => (
    <p>
        <strong>{question}</strong><br />

        <RunningText as='span'>
            {children}
        </RunningText>
    </p>
);

const Note = styled(Card)`
    border-color: #F5A623;
`;

const What = () => (
    <>
        <QA question='What does twofac do?'>
            It generates 5-digit codes to be used when logging onto a Steam account 
            protected by the Steam Guard Mobile Authenticator, given the <i>shared 
            secret</i> belonging to said account.
        </QA>

        <QA question={<span>What's a <i>shared secret</i>?</span>}>
            A <i>shared secret</i> is generated when enabling the Steam Guard 
            Mobile Authenticator and known both to the Steam servers and your 
            authenticator (hence, <i>shared</i>), which is usually your phone. 
            Alongside the current time, it is used to generate Steam {' '}
            <abbr title='Two-Factor Authentication' className='initialism'>2FA</abbr> {' '}
            codes. <i> Actually retrieving your shared secret 
            is out of the scope of this page, but <code>
                <a href={links.enable}>enableTwoFactor</a>
            </code> might help you.</i>
        </QA>

        <QA question='How will my secrets be stored?'>
            If you don't upload them by logging on and selecting the relevant icon, 
            your secrets are stored in your browser's local storage.
            <br />

            When you do choose to upload them they will be stored in encrypted form 
            on an online database and transferred through a secure connection (TLS). 
            For more information about the encryption techniques take a look at 
            the <code>server/src/crypto.js</code> file.
        </QA>

        <Note>
            <p>
                <b>A note on the security of twofac</b>
            </p>

            <p>
                When not using the online secret store, the security of your 
                secrets <b>hinges on the security of your device</b>.
            </p>

            <p>
                Otherwise, the security of your secrets is out of your hand - 
                it's in mine. I make absolutely no guarantees in regards to 
                security and while I personally believe it to be solid, nothing 
                is infallible.
            </p>

            <p>
                In short, only use this service when you are okay with the 
                risks and no other options are available.
            </p>
        </Note>
    </>
);

export default What;
