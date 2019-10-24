import React from 'react';

import List from '../components/lib/List';

const CodeList = ({ list }) => {
    return (
        <List>
            {list.map(({ alias }) => (
                <List.Item key={alias}>
                    {alias}
                </List.Item>
            ))}
        </List>
    );
};

export const UpdatingCodeList = ({ list }) => {
    return (
        <CodeList list={list} />
    );
};

export default CodeList;
