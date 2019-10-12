const crypto = require('crypto');
const argon2 = require('argon2');
const fp = require('fastify-plugin');
const { UserError } = require('./error');

const argonOptions = { timeCost: 4 };

const cipherKeySize = process.env.CIPHER_KEY_SIZE || 32; // 32 Bytes == 256 Bit
const cipherAlgorithm = process.env.CIPHER_ALG || 'aes256';

const hash = exports.hash = {
    generate: (plain) => argon2.hash(plain, argonOptions),
    verify: (hash, plain) => argon2.verify(hash, plain, argonOptions),
};

const validate = exports.validate = async (plain, hashed) => {
    if (!(await hash.verify(hashed, plain))) {
        throw new UserError('Invalid information', 400);
    }
}

const authenticate = exports.authenticate = fp(async (fastify, opts) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET env not provided');
    }

    fastify.register(require('fastify-jwt'), {
        secret: process.env.JWT_SECRET,
    });

    fastify.decorate('user', {});
    fastify.decorate('account', {});
    fastify.decorate('authenticate', async (req, res) => {
        try {
            fastify.user = await req.jwtVerify();
            fastify.account = await fastify.database.User.findOne({
                name: fastify.user.name
            });

            if (!fastify.account) {
                throw new UserError('User not found');
            }
        } catch (err) {
            throw UserError.consolidate(
                err, new UserError('Invalid token', 403, err.message),
            );
        }
    });
});

const derive = (password, salt, size = cipherKeySize) =>    
    argon2.hash(password, { ...argonOptions, salt, hashLength: size, raw: true });

const encipher = exports.encipher = async (plaintext, password) => {
    const salt = crypto.randomBytes(32);
    const vector = crypto.randomBytes(16);

    const key = await derive(password, salt);
    const cipher = crypto.createCipheriv(cipherAlgorithm, key, vector);

    const encrypted = cipher.update(plaintext, 'utf8', 'base64')
        + cipher.final('base64');

    return { encrypted, salt: salt.toString('base64'),
        vector: vector.toString('base64') };
};

const decipher = exports.decipher = async (encrypted, password, salt, vector) => {
    const key = await derive(password, Buffer.from(salt, 'base64'));
    const decipher = crypto.createDecipheriv(cipherAlgorithm, key,
        Buffer.from(vector, 'base64'));

    const decrypted = decipher.update(encrypted, 'base64', 'utf8')
        + decipher.final('utf8');

    return decrypted;
};
