const fp = require('fastify-plugin');
const { UserError } = require('../error');
const { encipher, decipher, validate } = require('../crypto');

module.exports = async (fastify, opts) => {
    fastify.post('/get', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    password: { type: 'string' },
                },
            },
        },
        preValidation: [ fastify.authenticate ],
    }, async (req, res) => {
        await validate(req.body.password, fastify.account.password);

        const decrypted = [];
        for (const secret of fastify.account.secrets) {
            decrypted.push({
                alias: secret.alias,
                secret: await decipher(secret.raw, req.body.password,
                    secret.salt, secret.vector),
            });
        }

        delete req.body.password;

        return { status: { success: true }, secrets: decrypted };
    });

    fastify.post('/add', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    alias: { type: 'string' },
                    secret: { type: 'string' },
                    password: { type: 'string' },
                },
                required: [ 'alias', 'secret', 'password' ],
            },
        },
        preValidation: [ fastify.authenticate ],
    }, async (req, res) => {
        const { alias } = req.body;
        if (fastify.account.secrets.map((s) => s.alias).includes(alias)) {
            throw new UserError('Alias already exists');
        }

        await validate(req.body.password, fastify.account.password);

        const { encrypted, salt, vector } = await encipher(req.body.secret,
            req.body.password);

        delete req.body.secret;
        delete req.body.password;

        fastify.account.secrets.push({
            raw: encrypted,
            alias: alias, salt, vector,
        });

        await fastify.account.save();

        return { status: { success: true } };
    });

    fastify.delete('/delete', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    alias: { type: 'string' },
                },
                required: [ 'alias' ],
            },
        },
        preValidation: [ fastify.authenticate ],
    }, async (req, res) => {
        const { length } = fastify.account.secrets;
        fastify.account.secrets = fastify.account.secrets.filter(
            (s) => s.alias !== req.body.alias
        );

        await fastify.account.save();

        const deleted = length - fastify.account.secrets.length;
        return { status: { success: deleted !== 0, deleted } };
    });
};
