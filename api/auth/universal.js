const db = require('../database');
const { UserError } = require('../error');
const { jwt, hash, validate } = require('../crypto');

const doSignUp = async (req, res) => {
    const hashedPassword = await hash.generate(req.body.password);

    delete req.body.password;

    const { User } = db.connect();
    const user = await (new User({
        name: req.body.username,
        password: hashedPassword,
        secrets: [],
    })).save();

    return { status: { success: true }, token: jwt.sign({ name: user.name }) };
};

const doSignIn = async (req, res, user) => {
    await validate(req.body.password, user.password);

    delete req.body.password;
    delete user.password;

    return { status: { success: true }, token: jwt.sign({ name: user.name }) };
};

module.exports = async (req, res) => {
    const { User } = db.connect();

    try {
        const user = await User.findOne({ name: req.body.username });

        if (user) {
            res.json(await doSignIn(req, res, user));
        } else {
            res.json(await doSignUp(req, res));
        }
    } catch (err) {
        console.error(err);

        res.status(500).json({ status: UserError.consolidate(
            err, new UserError('Universal authentication error', 500,
                err.message),
        ) });
    }
};
