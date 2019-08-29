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
        },
    });

    fastify.get('/', {
        schema: {
            response: {
                '2xx': 'status#',
                '4xx': 'error#',
                '5xx': 'error#',
            },
        },
    }, async (req, res) => ({
        status: {
            success: true,
            message: 'Did you get lost?',
        },
    }));

    fastify.register(require('./routes/code'), { prefix: 'code' });
};
