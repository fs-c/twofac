import styled from 'styled-components';

const List = styled.ul`
    margin: 0;
    padding: 0;
`;

const ListItem = styled.li`
    padding: 1em;
    list-style-type: none;

    border-top: 1px solid var(--accents-7);
    border-left: 1px solid var(--accents-7);
    border-right: 1px solid var(--accents-7);

    background-color: ${({ active }) => active ? 'var(--accents-1)' : 'inherit'};

    :first-child {
        border-radius: 5px 5px 0 0;
    }

    :last-child {
        border-radius: 0 0 5px 5px;
        border-bottom: 1px solid var(--accents-7);
    }

    /* TODO: Solve more elegantly */
    :first-child:last-child {
        border-radius: 5px 5px 5px 5px;
    }
`;

List.Item = ListItem;

export default List;
