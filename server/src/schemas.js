const plugin = require('fastify-plugin');

exports.plugin = plugin(async (fastify, opts) => {
    fastify.addSchema({
        $id: 'status',
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            message: { type: 'message' },
        },
        required: [ 'success', 'message' ],
    })
});

exports.build = (fields) => ({
    type: 'object',
    properties: fields,
});
