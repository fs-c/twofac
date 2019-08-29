const SteamTotp = require('steam-totp');

const promisify = (fn, ...args) => {
    return new Promise((resolve, reject) => {
        fn(...args, (err, ...data) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(data);
            }
        });
    });
};

exports.generate = async (sharedSecret) => {
    const [ code, offset, latency ] = await promisify(SteamTotp.getAuthCode,
        sharedSecret);

    return { code, offset, latency };
};
