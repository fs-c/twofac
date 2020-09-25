const { connect } = require('../database');
const { authenticate } = require('../utils');
const { validate, decipher } = require('../crypto');

module.exports = authenticate(async (req, res, { user }) => {    
    try {
        await validate(req.body.password, user.password);
    } catch (err) {
        return res.status(err.statusCode).json({status: err });
    }

    const decrypted = [];
    for (const secret of user.secrets) {
        decrypted.push({
            alias: secret.alias,
            secret: await decipher(secret.raw, req.body.password,
                secret.salt, secret.vector),
        });
    }

    delete req.body.password;

    res.json({ status: { success: true }, secrets: decrypted });
});
