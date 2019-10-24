import React, { useState, useEffect } from 'react';

import List from '../components/lib/List';
import { Flex } from '../components/lib/utils';
import Octicon, { X } from '@primer/octicons-react';

import styled from 'styled-components';
import { generateMobileCode } from '../helpers';

const generateCodeTuple = (secret) => ({
    old: generateMobileCode(secret, -30),
    current: generateMobileCode(secret),
});

const CodeList = ({ codes, onDelete }) => {
    const Alias = styled.span`
        color: var(--accents-6);
    `;

    const ItemRow = styled(Flex).attrs({ direction: 'row' })`
        justify-content: space-between;
    `;

    const DeleteButton = styled(Flex)`
        width: auto;
        justify-content: space-evenly;

        border: 0px;
        color: var(--accents-6);
        background-color: inherit;

        cursor: pointer;
        transition: 0.2s;

        :hover {
            color: var(--error);
        }
    `;

    const Code = styled.code`
        font-size: 1.3em;
        letter-spacing: 1.5px;
        color: var(--${({ main }) => main ? 'foreground' : 'accents-6'});
    `;

    return (
        <List>
            {Object.keys(codes).sort().map((alias) => (
                <List.Item key={alias}>
                    <ItemRow>
                        <Alias>{alias}</Alias>

                        <DeleteButton as='button' onClick={() => onDelete(alias)}>
                            <Octicon icon={X} verticalAlign='middle' />
                        </DeleteButton>
                    </ItemRow>

                    <ItemRow>
                        <div>
                            <Code main>{codes[alias].current}</Code>
                        </div>

                        <div>
                            <Code>{codes[alias].old}</Code>
                        </div>
                    </ItemRow>
                </List.Item>
            ))}
        </List>
    );
};

export const UpdatingCodeList = ({ list, onDelete }) => {
    const [ codes, setCodes ] = useState({});

    useEffect(() => {
        setCodes(list.reduce((acc, cur) => {
            acc[cur.alias] = generateCodeTuple(cur.secret);
            return acc;
        }, {}));
    }, [ list ]);

    return (
        <CodeList codes={codes} onDelete={onDelete} />
    );
};

export default CodeList;
