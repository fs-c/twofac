import { useRef, useEffect } from 'react';

import axios from 'axios';
import totp from 'steam-totp';

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
        console.log('local secret store get', LocalSecretStore.prefix + alias, alias);

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
    static baseUri = process.env.REACT_APP_API_URL;

    static handle(err) {
        if (err.userError) {
            throw err;
        } else if (err.response) {
            console.error(err.response);

            if (err.response.data && err.response.data.status) {
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

    static async request(method, uri, requestData = {}, options = {}) {
        const { token, required = [] } = options;

        try {
            const { data } = await axios({
                method, data: requestData,
                url: `${API.baseUri}/${uri}`,
                headers: token ? { 'Authorization': 'Bearer ' + token } : {},
            });

            for (const requirement of required) {
                if (!data[requirement]) {
                    throw new Error('Malformed response, missing ' + requirement);
                }
            }

            return data;
        } catch (err) {
            API.handle(err);
        }
    }

    static async auth(username, password) {
        const data = await API.request('post', 'auth/universal', {
            username, password,
        }, { required: [ 'token' ] });

        const { token } = data;

        sessionStorage.setItem('token', token);
        return token;
    }

    static logout() {
        sessionStorage.removeItem('token');
    }

    static async getSecrets(token, password) {
        const data = await API.request('post', 'secrets/get', {
            password,
        }, { token, required: [ 'secrets' ] });

        return data.secrets;
    }

    static async saveSecret(token, password, alias, secret) {
        const data = await API.request('post', 'secrets/add', {
            password, alias, secret,
        }, { token });

        return data;
    }

    static async deleteSecret(token, alias) {
        const data = await API.request('delete', 'secrets/delete', {
            alias,
        }, { token });

        return data;
    }
}

API.Error = class extends Error {
    userError = true;

    constructor(message, details = null) {
        super(message);

        this.details = details;
    };
};
