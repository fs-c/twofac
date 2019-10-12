module.exports = async (fastify, opts) => {
    fastify.addSchema({
        $id: 'status',
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
        },
        required: [ 'success', 'message' ],
    });

    fastify.addSchema({
        $id: 'error',
        type: 'object',
        properties: {
            status: 'status#',
            error: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    });

    fastify.get('/', {
        schema: {
            response: {
                '2xx': { type: 'object', properties: { status: 'status#' } },
                '4xx': 'error#',
                '5xx': 'error#',
            },
        },
    }, async (req, res) => ({
        status: {
            success: true,
            message: 'Hello world',
        },
    }));

    fastify.register(require('./routes/auth'));
    fastify.register(require('./routes/secrets'), { prefix: 'secrets' });
    // fastify.register(require('./routes/code'), { prefix: 'code' });
};
