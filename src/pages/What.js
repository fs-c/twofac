import React from 'react';

import { RunningText } from '../components/lib/utils';

const links = {
    enable: 'https://github.com/DoctorMcKay/node-steam-user#enabletwofactorcallback',
    storage: 'https://en.wikipedia.org/wiki/Web_storage',
};

const What = () => (
    <>
        <p>
            <strong>
                What does twofac do?
            </strong><br/>

            <RunningText as='span'>
                It generates 5-digit codes to be used when logging onto a Steam account 
                protected by the Steam Guard Mobile Authenticator, given the <i>shared 
                secret</i> belonging to said account.
            </RunningText>
        </p>

        <p>
            <strong>
                What's a <i>shared secret</i>?
            </strong><br/>

            <RunningText as='span'>
                A <i>shared secret</i> is generated when enabling the Steam Guard 
                Mobile Authenticator and known both to the Steam servers and your 
                authenticator (hence, <i>shared</i>), which is usually your phone. 
                Alongside the current time, it is used to generate Steam {' '}
                <abbr title='Two-Factor Authentication' className='initialism'>2FA</abbr> {' '}
                codes. <i> Actually retrieving your shared secret 
                is out of the scope of this page, but <code>
                    <a href={links.enable}>enableTwoFactor</a>
                </code> might help you.</i>
            </RunningText>
        </p>
    </>
);

export default What;
