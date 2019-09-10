import React from 'react';

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

export default Navbar;
