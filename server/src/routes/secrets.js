const { UserError } = require('../error');
const { encipher, decipher, hash } = require('../crypto');

module.exports = async (fastify, opts) => {
    const { User } = fastify.database;

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
        const user = (await User.findOne({
            name: fastify.user.name,
        }) || {});

        const { password } = req.body;
        if (!(await hash.verify(user.password, req.body.password))) {
            throw new UserError('Invalid password');
        }

        const decrypted = [];
        for (const secret of user.secrets) {
            decrypted.push(await decipher(
                secret.raw, password, secret.salt,
                secret.vector,
            ));
        }

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
        const user = (await User.findOne({
            name: fastify.user.name,
        }) || {});

        const { alias } = req.body;
        if (user.secrets.map((s) => s.alias).includes(alias)) {
            throw new UserError('Alias already exists');
        }

        const { password } = req.body;
        if (!(await hash.verify(user.password, req.body.password))) {
            throw new UserError('Invalid password');
        }

        const { secret } = req.body;
        const { encrypted, salt, vector } = await encipher(secret, password);

        delete req.body.password;

        user.secrets.push({
            raw: encrypted,
            alias, salt, vector,
        });

        await user.save();

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
        const user = (await User.findOne({
            name: fastify.user.name,
        }) || {});

        const { alias } = req.body;
        const { length } = user.secrets;
        user.secrets = user.secrets.filter((s) => s.alias !== alias);

        await user.save();

        const deleted = length - user.secrets.length;
        return { status: { success: deleted !== 0, deleted } };
    });
};
