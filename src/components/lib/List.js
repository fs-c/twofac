import styled from 'styled-components';

const List = styled.ul`
    margin: 0;
    padding: 0;
`;

const ListItem = styled.li`
    padding: 1em;
    list-style-type: none;

    border-top: 1px solid var(--accents-6);
    border-left: 1px solid var(--accents-6);
    border-right: 1px solid var(--accents-6);

    :hover {
        background-color: var(--accents-1);
    }

    :first-child {
        border-radius: 5px 5px 0 0;
    }

    :last-child {
        border-radius: 0 0 5px 5px;
        border-bottom: 1px solid var(--accents-6);
    }
`;

List.Item = ListItem;

export default List;
