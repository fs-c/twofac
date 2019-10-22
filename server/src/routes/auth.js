const { UserError } = require('../error');
const { hash, validate } = require('../crypto');

module.exports = async (fastify, opts) => {
    const { User } = fastify.database;

    fastify.post('/signup', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                },
                required: [ 'username', 'password' ],
            },
        },
    }, async (req) => {
        try {
            if (await User.findOne({ name: req.body.username })) {
                throw new UserError('User already exists', 400);
            }

            const hashedPassword = await hash.generate(req.body.password);

            delete req.body.password;

            const user = await (new User({
                name: username,
                password: hashedPassword,
                secrets: [],
            })).save();

            return { status: { success: true }, token: await res.jwtSign({
                name: user.name,
            }, { expiresIn: '2h' }) };
        } catch (err) {
            return UserError.consolidate(
                err, new UserError('Signup error', 500, err.message)
            );
        }
    });

    fastify.post('/signin', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                },
                required: [ 'username', 'password' ],
            },            
        },
    }, async (req, res) => {
        try {
            const user = await User.findOne({ name: req.body.username });

            if (!user) {
                throw new UserError('Invalid information', 400);
            }

            await validate(req.body.password, user.password)
            delete req.body.password;

            return { status: { success: true }, token: await res.jwtSign({
                name: user.name,
            }, { expiresIn: '2h' }) };
        } catch (err) {
            return UserError.consolidate(
                err, new UserError('Signin error', 500, err.message)
            );
        }
    });
};