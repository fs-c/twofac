import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Home from '../Home/Home';

import What from './What';
import Footer from './Footer';
import Contact from './Contact';

import { withNavbar } from './Navbar';

import { getBaseName } from '../../helpers';

const App = () => {
    const basename = getBaseName();

    return (<>
        <div className='h-100 pt-3 pt-md-5 pb-6'>
            <Container>
                <Router basename={basename}>
                    <Route exact path='/' component={withNavbar({ fancy: true })(Home)} />

                    <Route path='/what' component={withNavbar()(What)} />

                    <Route path='/contact' component={withNavbar()(Contact)} />
                </Router>
            </Container>
        </div>

        <Footer />
    </>);
};

export default App;
