const fastifyPlugin = require('fastify-plugin');

const { User } = require('./database/user');
const { connect } = require('./database/connect');

exports.connector = fastifyPlugin(async (fastify, opts) => {
	await connect(opts);

	fastify.log.info('Connected to database');

	fastify.decorate('database', { User });
});
