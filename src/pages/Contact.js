import React from 'react';

const links = {
    email: 'mailto:root@fsoc.space',
    steam: 'http://steamcommunity.com/profiles/76561198091491690',
}

const Contact = () => (
    <>
        <p>
            You can reach me via email at <a href={links.email}>root@fsoc.space</a>. 
            If email isn't your cup of tea, feel free to add <a href={links.steam}>steam/f50c</a>.
        </p>

        <p>
            For bug reports, feature requests and general questions or contributions, 
            please <a href='https://github.com/LW2904/twofac/issues/new'>submit an 
            issue</a> on github. 
        </p>
    </>
);

export default Contact;
