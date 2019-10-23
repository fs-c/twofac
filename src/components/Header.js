import React from 'react';

import Navigation from './lib/Navigation';
import { VerticalSpacer } from './lib/utils';

const Header = () => (
    <>
        <VerticalSpacer height={5} />

        <Navigation>
            <Navigation.Main href='/'>twofac</Navigation.Main>
            <Navigation.Divider />
            <Navigation.Item href='/what?'>/what?</Navigation.Item>
            <Navigation.Item href='/contact'>/contact</Navigation.Item>
        </Navigation>

        <VerticalSpacer height={4} />
    </>
);

export default Header;
