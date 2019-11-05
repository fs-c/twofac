import { useRef, useEffect } from 'react';

import axios from 'axios';
import totp from 'steam-totp';

import { resourceServer } from './.config';

export function getBaseName() {
	const { PUBLIC_URL } = process.env;

	return PUBLIC_URL ?
		new URL(PUBLIC_URL).pathname
	: '/';
}

export function generateMobileCode(secret, offset = 0) {
    if (!secret) {
        return '';
    }

    return totp.getAuthCode(secret, offset);
}

export function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export function getRemainingTime() {
    return 30 - (Math.floor(Date.now() / 1000) % 30);
}

export function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export class LocalSecretStore {
    static prefix = 'secret_';

    static parseAlias(alias) {
        return alias.split(LocalSecretStore.prefix)[1];
    }

    static getAll() {
        const secrets = [];

        for (let i = 0; i < localStorage.length; i++) {
            const alias = localStorage.key(i);

            if (!alias.includes(LocalSecretStore.prefix))
                continue;

            secrets.push({
                alias: LocalSecretStore.parseAlias(alias),
                secret: localStorage.getItem(alias),
            });
        }

        return secrets;
    }

    static get(alias) {
        console.log(LocalSecretStore.prefix + alias, alias);

        return localStorage.getItem(LocalSecretStore.prefix + alias);
    }

    static add(alias, secret) {
        localStorage.setItem(LocalSecretStore.prefix + alias, secret);
    }

    static remove(alias) {
        localStorage.removeItem(LocalSecretStore.prefix + alias);
    }
}

export class API {
    // TODO:
    //  - request abstraction
    //  - switch to taking an object as single argument

    static baseUri = `${resourceServer.uri}:${resourceServer.port}`;

    static handle(err) {
        if (err.userError) {
            throw err;
        } else if (err.response) {
            console.error(err.response);

            if (err.response.data) {
                throw new API.Error(err.response.data.status.message);
            }

            throw new API.Error('Request failed: ' + err.response.statusText);
        } else if (err.request) {
            console.error('No response', err.request);

            throw new API.Error('Response timeout', 'Please try again later');
        } else {
            console.error(err);

            throw new API.Error('Internal error',
                'Please feel free to file an issue on github');
        }
    }

    static async login(username, password) {
        try {
            const { data } = await axios.post(`${API.baseUri}/auth/signin`, {
                username, password,
            });

            if (!data.token) {
                throw new Error('Malformed response');
            }

            const { token } = data;

            sessionStorage.setItem('token', token);
            return token;
        } catch (err) {
            API.handle(err);
        }
    }

    static logout() {
        sessionStorage.removeItem('token');
    }

    static async getSecrets(token, password) {
        try {
            const { data } = await axios.post(`${API.baseUri}/secrets/get`, {
                password
            }, { headers: { 'Authorization': 'Bearer ' + token } });

            if (!data.secrets) {
                throw new Error('Malformed response');
            }

            return data.secrets;
        } catch (err) {
            API.handle(err);
        }
    }

    static async saveSecret(token, password, alias, secret) {
        try {
            const { data } = await axios.post(`${API.baseUri}/secrets/add`, {
                password, secret, alias,
            }, { headers: { 'Authorization': 'Bearer ' + token } });

            return data;
        } catch (err) {
            API.handle(err);
        }
    }

    static async deleteSecret(token, alias) {
        console.log({ token, alias });

        try {
            const { data } = await axios.delete(`${API.baseUri}/secrets/delete`, {
                data: { alias },
                headers: { 'Authorization': 'Bearer ' + token },
            });

            return data;
        } catch (err) {
            API.handle(err);
        }
    }
}

API.Error = class extends Error {
    userError = true;

    constructor(message, details = null) {
        super(message);

        this.details = details;
    };
};
