const { authenticate } = require('../utils');
const { validate, encipher } = require('../crypto');

module.exports = authenticate(async (req, res, { user }) => {    
    const { alias } = req.body;
    if (user.secrets.map((s) => s.alias).includes(alias)) {
        throw new UserError('Alias already exists');
    }

    try {
        await validate(req.body.password, user.password);
    } catch (err) {
        return res.status(err.statusCode).json(err);
    }

    const { encrypted, salt, vector } = await encipher(req.body.secret,
        req.body.password);

    delete req.body.secret;
    delete req.body.password;

    user.secrets.push({
        raw: encrypted,
        alias: alias, salt, vector,
    });

    await user.save();

    res.json({ status: { success: true } });
});
