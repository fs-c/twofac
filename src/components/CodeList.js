import React from 'react';

import List from '../components/lib/List';

const CodeList = ({ list }) => (
    <List>
        {list.map((item) => (
            <List.Item key={item.alias}>
                {item.alias}
            </List.Item>
        ))}
    </List>
);

export const UpdatingCodeList = ({ list }) => {
    return (
        <CodeList list={list} />
    );
};

export default CodeList;
