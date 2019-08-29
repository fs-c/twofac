const SteamTotp = require('steam-totp');
const { UserError } = require('../error');

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

module.exports = async (fastify, opts) => {
    fastify.post('/generate', {
        schema: {
            response: {
                '2xx': {
                    type: 'object',
                    properties: {
                        status: 'status#',
                        code: { type: 'string' },
                        offset: { type: 'number' },
                        latency: { type: 'number' },
                    },
                    required: [ 'status', 'code', 'offset', 'latency' ],
                },
                '4xx': 'error#',
                '5xx': 'error#',
            },
            body: {
                type: 'object',
                properties: {
                    secret: { type: 'string' },
                },
                required: [ 'secret' ],
            },
        },
    }, async (req, res) => {
        try {
            const [ code, offset, latency ] = await promisify(SteamTotp.getAuthCode,
                req.body.secret);
            fastify.log.debug('got auth', { code, offset, latency });            

            return {
                code, offset, latency,
                status: {
                    success: true,
                    message: 'Generated auth code',
                },
            };
        } catch (err) {
            throw new UserError('Failed generating code', 500, err.message);
        }
    });
};
