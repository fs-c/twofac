import React, { useState, useEffect } from 'react';

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

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const password = sessionStorage.getItem('password');

        if (!token || !password)
            return;

        (async () => {
            try {
                setOnlineList(await API.getSecrets(token, password));
            } catch (err) {
                console.error(err);
            }
        })();
    }, [setOnlineList]);

    const onLocalSecretSave = (item) => {
        setLocalList((prev) => prev.concat([ item ]));
        LocalSecretStore.add(item.alias, item.secret);
    };

    const onLocalSecretDelete = (alias) => {
        setLocalList((prev) => prev.filter((item) => item.alias !== alias));
        LocalSecretStore.remove(alias);
    };

    const onLocalSecretUpload = async (alias) => {
        const password = sessionStorage.getItem('password');
        const secret = LocalSecretStore.get(alias);

        if (!password || !secret) {
            setApiError({ message: 'Internal error',
                details: 'No secrets transmitted' });
            
            return;
        }

        try {
            await API.saveSecret(token, password, alias, secret);

            LocalSecretStore.remove(alias);

            setLocalList(LocalSecretStore.getAll());
            setOnlineList(await API.getSecrets(token, password));
        } catch (err) {
            console.error('saveSecret', err);

            setApiError(err.isApiError ? err : { message: 'Internal error' });
        }
    };

    const onOnlineSecretDelete = async (alias) => {
        try {
            await API.deleteSecret(token, alias);
        } catch (err) {
            console.error('deleteSecret', err);

            setApiError(err);
        }

        const password = sessionStorage.getItem('password');

        if (!password) {
            setApiError({ message: 'Internal error',
                details: 'The secret was deleted but the list could not be refreshed.' });

            return;
        }

        setOnlineList(await API.getSecrets(token, password));
    };

    const onLogin = async (token, password) => {
        setToken(token);
        // TODO: This is very suboptimal
        sessionStorage.setItem('password', password);

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

    const EmptyLocalList = (
        <Card>
            <b>Your local secrets appear here</b><br />
            <Label>After adding some{token ? '' : ' and signing in below'}, you'll 
            be able to move  them to the server</Label>
        </Card>
    );

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
                emptyComponent={EmptyLocalList}
                onUpload={token ? onLocalSecretUpload : null} />

            <VerticalSpacer height={4} />

            {token ? (
                <>
                    {apiError ? <>
                        <APIError message={apiError.message} details={apiError.details} />

                        <VerticalSpacer height={3} />
                    </> : <></>}

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
