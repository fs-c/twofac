import React, { useState } from 'react';

import Label from '../components/lib/Label';
import Input from '../components/lib/Input';
import Button from '../components/lib/Button';
import { Flex, VerticalSpacer } from '../components/lib/utils';

import { LocalSecretStore } from '../helpers';

const SecretInput = ({ onSave }) => {
    const [ alias, setAlias ] = useState('');
    const [ secret, setSecret ] = useState('');

    const handleSave = () => {
        if (!alias.length || LocalSecretStore.get(alias)) {
            // TODO: Communicate this
            console.error('invalid or duplicate alias');

            return;
        }

        onSave({ alias, secret });
    };

    return (
        <>
            <Flex direction='row'>
                <Input value={secret} onChange={({ target }) => setSecret(target.value)}
                    placeholder='Shared Secret' />
            </Flex>

            <VerticalSpacer height={3} />

            <Flex direction='row'>
                <Input.Split value={alias} onChange={({ target }) => setAlias(target.value)}
                    placeholder='Alias' />
                <Button.Split onClick={handleSave}>Save</Button.Split>
            </Flex>

            <Label>By default, your secret doesn't leave your browser</Label>
        </>
    );
};

export default SecretInput;
