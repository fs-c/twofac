const { UserError } = require('../error');
const { generate } = require('../steam/totp');

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
            return {
                ...(await generate(req.body.secret)),
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
