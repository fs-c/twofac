import React, { useState, useEffect } from 'react';

import List from '../components/lib/List';
import Octicon, { X } from '@primer/octicons-react';
import { Label, Flex } from '../components/lib/utils';

import styled from 'styled-components';
import { generateMobileCode, useInterval, getRemainingTime } from '../helpers';

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

    const EmptyList = styled.div`
        padding: 1em;
        text-align: center;
        border-radius: 5px;
        color: var(--accents-6);
        border: 1px solid var(--accents-6);
    `;

    const aliases = Object.keys(codes);

    return (
        aliases.length ? (
            <List>
                {aliases.sort().map((alias) => (
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
        ) : (
            <EmptyList>
                <b>Your locally saved secrets appear here.</b><br />
                <Label>To move them to the server, sign in below.</Label>
            </EmptyList>
        )
    );
};

export const UpdatingCodeList = ({ list, onDelete }) => {
    const [ codes, setCodes ] = useState({});

    const generateCodes = (list) => list.reduce((acc, cur) => {
        acc[cur.alias] = generateCodeTuple(cur.secret);
        return acc;
    }, {})

    // Initialize codes object, this only ever runs on master list change
    useEffect(() => {
        setCodes(generateCodes(list));
    }, [ list ]);

    useInterval(() => {
        // If it was reset (ergo time == 30) in the last tick
        if (getRemainingTime() === 1) {
            setCodes(generateCodes(list));
        }
    }, 1000);

    return (
        <CodeList codes={codes} onDelete={onDelete} />
    );
};

export default CodeList;
