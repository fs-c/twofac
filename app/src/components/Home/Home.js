import React from 'react';

import Container from 'react-bootstrap/Container';

import SingleCodeGenerator from '../SingleCodeGenerator/SingleCodeGenerator';

const Home = () => {
    return (<>
        <div className='h-100 mt-3 mt-md-5'>
            <Container>
                <p>
                    <strong className='color-rotating'>twofac</strong>

                    <span className='text-muted float-right'>
                        <a className='text-link' href='/what?'>/what?</a> <a className='text-link' href='/contact'>/contact</a>
                    </span>
                </p>

                <p>
                    A web implementation of <a className='text-link' href='https://support.steampowered.com/kb_article.php?ref=8625-wrah-9030'>Steam flavored Two-Factor Authentication</a>.
                </p>

                <div>
                    <SingleCodeGenerator />
                </div>
            </Container>
        </div>
    </>);
};

export default Home;
