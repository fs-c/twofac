import React from 'react';

const Contact = () => {
    const steam = <a href='https://steamcommunity.com/id/f50c'>steam/f50c</a>;

    return (<>
        <p>
            You can reach me via email at <a href='mailto:root@fsoc.space'>root@fsoc.space</a>. 
            If email is not your thing, feel free to add {steam} for a quick response.
        </p>
        
        <p>
            For bug reports, feature requests or other contributions, 
            please <a href='https://github.com/LW2904/twofac/issues'>create an issue</a> on github.
        </p>
    </>)
};

export default Contact;
