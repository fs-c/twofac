import React, { useState, useEffect } from 'react';

import SecretInput from '../components/SecretInput';
import { VerticalSpacer } from '../components/lib/utils';
import { UpdatingCodeList } from '../components/CodeList';

import { LocalSecretStore } from '../helpers';

const links = {
    steamGuard: 'https://support.steampowered.com/kb_article.php?ref=8625-wrah-9030',
};

const Home = () => {
    const [ list, setList ] = useState(LocalSecretStore.getAll());

    const onSecretSave = (item) => {
        setList((prev) => prev.concat([ item ]));
        LocalSecretStore.add(item.alias, item.secret);
    };

    const onSecretDelete = (alias) => {
        setList((prev) => prev.filter((item) => item.alias !== alias));
        LocalSecretStore.remove(alias);
    };

    return (
        <>
            <p>
                A web implementation of the <a href={links.steamGuard}>Steam Guard Mobile 
                Authenticator</a>.
            </p>

            <VerticalSpacer height={4} />

            <SecretInput onSave={onSecretSave} />

            <VerticalSpacer height={4} />

            <UpdatingCodeList list={list} onDelete={onSecretDelete} />
        </>
    )
};

export default Home;
