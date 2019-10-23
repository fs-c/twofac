import React from 'react';

import SecretInput from '../components/SecretInput';
import { VerticalSpacer } from '../components/lib/utils';

const links = {
    steamGuard: 'https://support.steampowered.com/kb_article.php?ref=8625-wrah-9030',
};

const Home = () => (
    <>
        <p>
            A web implementation of the <a href={links.steamGuard}>Steam Guard Mobile 
            Authenticator</a>.
        </p>

        <VerticalSpacer height={4} />

        <SecretInput />
    </>
);

export default Home;
