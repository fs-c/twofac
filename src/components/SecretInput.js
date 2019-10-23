import React from 'react';

import Label from '../components/lib/Label';
import Input from '../components/lib/Input';
import Button from '../components/lib/Button';
import { Flex, VerticalSpacer } from '../components/lib/utils';

const SecretInput = () => {
    return (
        <>
            <Flex direction='row'>
                <Input placeholder='Shared Secret' />
            </Flex>

            <VerticalSpacer height={3} />

            <Flex direction='row'>
                <Input.Split placeholder='Alias' />
                <Button.Split>Save</Button.Split>
            </Flex>

            <Label>By default, your secret doesn't leave your browser</Label>
        </>
    );
};

export default SecretInput;
