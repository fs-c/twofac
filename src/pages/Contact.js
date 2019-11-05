import React from 'react';

import { RunningText } from '../components/lib/utils';

const links = {
    email: 'mailto:root@fsoc.space',
    github: 'https://github.com/LW2904/twofac/issues/new',
    steam: 'http://steamcommunity.com/profiles/76561198091491690',
};

const Contact = () => (
    <>
        <RunningText>
            You can reach me via email at <a href={links.email}>root@fsoc.space</a>. 
            If email isn't your cup of tea, feel free to add <a href={links.steam}>steam/f50c</a>.
        </RunningText>

        <RunningText>
            For bug reports, feature requests and general questions or contributions, 
            please <a href={links.github}>submit an issue</a> on github. 
        </RunningText>
    </>
);

export default Contact;
