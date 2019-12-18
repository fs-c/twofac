import { Link } from 'wouter';

import { scale } from './utils';
import styled from 'styled-components';

const Navigation = styled.header`
    display: flex;
    flex-direction: row;

    padding-top: ${scale(4)}px;
    padding-bottom: ${scale(4)}px;

`;

const NavigationItem = styled(Link)`
    color: var(--accents-6);
    text-decoration: underline;

    :hover {
        color: var(--accents-6);
        text-decoration: none;
    }

    :not(:last-child) {
        margin-right: 0.5em;
    }
`;

const NavigationMain = styled(NavigationItem)`
    transform: skew(-5deg);
    padding: 0 0.3em 0 0.3em;
    box-shadow: 4px 4px var(--highlight);
    border: 2px solid var(--foreground);

    font-weight: bolder;
    text-decoration: none;
    color: var(--foreground);
    background-color: var(--background);


    transition-duration: 0.3s;

    :hover {
        color: var(--foreground);
        box-shadow: -4px -4px var(--highlight);
    }
`;

const NavigationDivider = styled.div`
    flex-grow: 1;
`;

Navigation.Item = NavigationItem;
Navigation.Main = NavigationMain;
Navigation.Divider = NavigationDivider;

export default Navigation;
