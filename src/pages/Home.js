import React, { useState } from 'react';

import Login from '../components/Login';
import SecretInput from '../components/SecretInput';
import { UpdatingCodeList } from '../components/CodeList';
import {
    Card, APIError, Label, RunningText, VerticalSpacer
} from '../components/lib/utils';

import { API, LocalSecretStore } from '../helpers';

const links = {
    steamGuard: 'https://support.steampowered.com/kb_article.php?ref=8625-wrah-9030',
};

const EmptyLocalList = (
    <Card>
        <b>Your local secrets appear here</b><br />
        <Label>After adding some and signing in below, you'll be able to move 
        them to the server</Label>
    </Card>
);

const EmptyOnlineList = (
    <Card>
        <b>Your online secrets appear here</b><br />
        <Label>They are synced with your account</Label>
    </Card>
);

const Home = () => {
    const [ localList, setLocalList ] = useState(LocalSecretStore.getAll());
    const [ onlineList, setOnlineList ] = useState([]);
    const [ token, setToken ] = useState(sessionStorage.getItem('token') || null);

    const [ apiError, setApiError ] = useState(null);

    const onLocalSecretSave = (item) => {
        setLocalList((prev) => prev.concat([ item ]));
        LocalSecretStore.add(item.alias, item.secret);
    };

    const onLocalSecretDelete = (alias) => {
        setLocalList((prev) => prev.filter((item) => item.alias !== alias));
        LocalSecretStore.remove(alias);
    };

    const onOnlineSecretDelete = (alias) => {
        console.warn('stub');
    };

    const onLogin = async (token, password) => {
        setToken(token);

        try {
            setOnlineList(await API.getSecrets(token, password));
        } catch (err) {
            console.error('getSecrets', err);

            setApiError(err);
        }
    };

    const onLogout = async () => {
        await API.logout();
        setToken(null);
    };

    return (
        <>
            <RunningText>
                A web implementation of the <a href={links.steamGuard}>Steam Guard 
                Mobile Authenticator</a>.
            </RunningText>

            <VerticalSpacer height={4} />

            <SecretInput onSave={onLocalSecretSave} />

            <VerticalSpacer height={4} />

            <UpdatingCodeList list={localList} onDelete={onLocalSecretDelete}
                emptyComponent={EmptyLocalList} />

            <VerticalSpacer height={4} />

            {token ? (
                <>
                    {apiError ? <APIError error={apiError} /> : <></>}

                    <Label><b>Online secrets</b> (
                        <a href='!#' onClick={onLogout}>Logout</a>
                    )</Label>

                    <UpdatingCodeList list={onlineList}
                        onDelete={onOnlineSecretDelete}
                        emptyComponent={EmptyOnlineList} />
                </>
            ) : (
                <Login onLogin={onLogin} />
            )}
        </>
    )
};

export default Home;
