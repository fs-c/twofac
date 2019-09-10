import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Home from '../Home/Home';

import What from './What';
import Navbar from './Navbar';
import Footer from './Footer';
import Contact from './Contact';

import { getBaseName } from '../../helpers';

const App = () => {
    const basename = getBaseName();

    return (<>
        <div className='h-100 pt-3 pt-md-5 pb-6'>
            <Container>
                <Router basename={basename}>
                    <Route exact path='/'>
                        <Navbar fancy />
                        <Home />
                    </Route>

                    <Route path='/what'>
                        <Navbar />
                        <What />
                    </Route>

                    <Route path='/contact'>
                        <Navbar />
                        <Contact />
                    </Route>
                </Router>
            </Container>
        </div>

        <Footer />
    </>);
};

export default App;
