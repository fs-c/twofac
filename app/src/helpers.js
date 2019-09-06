import { useRef, useEffect } from 'react';

// This doesn't work in the browser, sorry McKay
global._mckay_statistics_opt_out = true;

const totp = require('steam-totp');

export function getBaseName() {
	const { PUBLIC_URL } = process.env;
	
	return PUBLIC_URL ?
		new URL(PUBLIC_URL).pathname
	: '/';
}

export function generateMobileCode(secret) {
    /* if (secret.length !== 28 || secret[secret.length - 1] !== '=') {
        throw new Error('Malformed secret');
    } */

    return totp.getAuthCode(secret, 0);
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
