const { plugin, build } = require('./schemas');

module.exports = async (fastify, opts) => {
    fastify.register(plugin);

    fastify.get('/', build({
        status: 'status#'
    }), async (req, res) => ({
        status: {
            success: true,
            message: 'Did you get lost?',
        },
    }));
};
