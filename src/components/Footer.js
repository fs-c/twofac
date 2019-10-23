import React from 'react';

import { scale } from './lib/utils';
import styled from 'styled-components';

const Footer = styled.footer`
    margin-top: auto;
    text-align: center;
    margin-bottom: ${scale(5)}px;
    padding-top: ${scale(4)}px;

    color: var(--accents-4);

    a {
        text-decoration-color: var(--highlight);
    }
`;

export default () => (
    <Footer>
        Provided for free and fun by <a href='https://fsoc.space'>fsoc</a>.<br />
        Find the code on <a href='https://github.com/LW2904/twofac'>github</a>.
    </Footer>
);
