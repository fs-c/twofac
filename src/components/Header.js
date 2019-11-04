import React from 'react';

import Navigation from './lib/Navigation';
import { IconButton, VerticalSpacer } from './lib/utils';
import Octicon, { LightBulb } from '@primer/octicons-react';

import styled from 'styled-components';

const LightSwitch = styled(IconButton)`
    :hover {
        color: var(--foreground);
    }
`;

const Header = ({ onThemeSwitch }) => (
    <>
        <VerticalSpacer height={5} />

        <Navigation>
            <Navigation.Main href='/'>twofac</Navigation.Main>
            <Navigation.Divider />
            <Navigation.Item href='/what?'>/what?</Navigation.Item>
            <Navigation.Item href='/contact'>/contact</Navigation.Item>
            <Navigation.Item onClick={onThemeSwitch}>
                <LightSwitch><Octicon icon={LightBulb} /></LightSwitch>
            </Navigation.Item>
        </Navigation>

        <VerticalSpacer height={4} />
    </>
);

export default Header;
