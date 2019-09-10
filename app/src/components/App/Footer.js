import React from 'react';

import { Container } from 'react-bootstrap';

const Footer = () => {
    const links = {
        fsoc: <a href='https://fsoc.space/' className='color-rotating-underline'>fsoc</a>,
        github: <a href='https://github.com/LW2904/twofac' className='color-rotating-underline'>
            github
        </a>,
    };

    return (<>
        <footer id='footer' className='text-muted text-center my-5 pt-2'>
            <Container>
                <p>
                    Provided for free and fun by {links.fsoc}.<br/>
                    Find the code on {links.github}.
                </p>
            </Container>
        </footer>
    </>);
};

export default Footer;