import React from 'react';

const links = {
    steamGuard: 'https://support.steampowered.com/kb_article.php?ref=8625-wrah-9030',
};

const Home = () => (
    <p>
        A web implementation of the <a href={links.steamGuard}>Steam Guard Mobile 
        Authenticator</a>.
    </p>
);

export default Home;
