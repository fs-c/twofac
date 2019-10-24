import React, { useState, useEffect } from 'react';

import SecretInput from '../components/SecretInput';
import { VerticalSpacer } from '../components/lib/utils';
import { UpdatingCodeList } from '../components/CodeList';

import { LocalSecretStore } from '../helpers';

const links = {
    steamGuard: 'https://support.steampowered.com/kb_article.php?ref=8625-wrah-9030',
};

const Home = () => {
    const [ list, setList ] = useState([]);

    useEffect(() => {
        setList(LocalSecretStore.getAll());
    }, []);

    return (
        <>
            <p>
                A web implementation of the <a href={links.steamGuard}>Steam Guard Mobile 
                Authenticator</a>.
            </p>

            <VerticalSpacer height={4} />

            <SecretInput onSave={(item) => setList((prev) => prev.concat([ item ]))} />

            <VerticalSpacer height={4} />

            <UpdatingCodeList list={list} />
        </>
    )
};

export default Home;
