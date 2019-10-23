import React from 'react';

import Label from '../components/lib/Label';
import Input from '../components/lib/Input';
import Button from '../components/lib/Button';
import { Flex, VerticalSpacer } from '../components/lib/utils';

const links = {
    steamGuard: 'https://support.steampowered.com/kb_article.php?ref=8625-wrah-9030',
};

const Home = () => (
    <>
        <p>
            A web implementation of the <a href={links.steamGuard}>Steam Guard Mobile 
            Authenticator</a>.
        </p>

        <VerticalSpacer height={4} />

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

export default Home;
