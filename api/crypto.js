const crypto = require('crypto');
const argon2 = require('argon2');
const { UserError } = require('./error');
const jsonwebtoken = require('jsonwebtoken');

const argonOptions = { timeCost: 4 };

const cipherKeySize = process.env.CIPHER_KEY_SIZE || 32; // 256 Bit
const cipherAlgorithm = process.env.CIPHER_ALG || 'aes256';

const hash = exports.hash = {
    generate: (plain) => argon2.hash(plain, argonOptions),
    verify: (hash, plain) => argon2.verify(hash, plain, argonOptions),
};

const validate = exports.validate = async (plain, hashed) => {
    if (!(await hash.verify(hashed, plain))) {
        throw new UserError('Invalid information', 400);
    }
};

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

const jwt = exports.jwt = {
    // If JWT_TOKEN isn't given nothing works properly so don't provide a default.

    sign: (payload) => jsonwebtoken.sign(payload, process.env.JWT_TOKEN, {
        expiresIn: '2 days',
    }),
    verify: (token) => jsonwebtoken.verify(token, process.env.JWT_TOKEN),
};
