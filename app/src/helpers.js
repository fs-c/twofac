import { useRef, useEffect } from 'react';

import totp from 'steam-totp';

export function getBaseName() {
	const { PUBLIC_URL } = process.env;
	
	return PUBLIC_URL ?
		new URL(PUBLIC_URL).pathname
	: '/';
}

export function generateMobileCode(secret, offset = 0) {
    /* if (secret.length !== 28 || secret[secret.length - 1] !== '=') {
        throw new Error('Malformed secret');
    } */

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
    static getAll() {
        const secrets = [];

        for (let i = 0; i < localStorage.length; i++) {
            const alias = localStorage.key(i);

            secrets.push({
                alias,
                secret: localStorage.getItem(alias),
            });
        }

        return secrets;
    }

    static add(alias, secret) {
        localStorage.setItem(alias, secret);
    }

    static remove(alias) {
        localStorage.removeItem(alias);
    }

    static clear() {
        localStorage.clear();
    }
}
