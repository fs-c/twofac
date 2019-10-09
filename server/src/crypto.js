const argon2 = require('argon2');

const argonOptions = { timeCost: 4 };

const hash = exports.hash = {
    generate: (plain) => argon2.hash(plain, argonOptions),
    verify: (hash, plain) => argon2.verify(hash, plain, argonOptions),
};
