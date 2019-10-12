const { hash } = require('../crypto');
const { UserError } = require('../error');

const userBody = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        password: { type: 'string' },
    },
    required: [ 'username', 'password' ],
};

module.exports = async (fastify, opts) => {
    const { User } = fastify.database;

    fastify.post('/signup', {
        schema: {
            body: userBody,
        },
    }, async (req) => {
        try {
            const { username } = req.body;
            if (await User.findOne({ name: username })) {
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
            body: userBody,            
        },
    }, async (req, res) => {
        try {
            const { username } = req.body;
            const user = await User.findOne({ name: username });

            if (!user) {
                throw new UserError('Invalid information', 400);
            }

            if (!(await hash.verify(user.password, req.body.password))) {
                throw new UserError('Invalid information', 400);
            }

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
