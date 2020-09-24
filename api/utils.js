const { jwt } = require('./crypto');
const { UserError } = require('./error');

const { User } = require('./database').connect();

const authenticate = exports.authenticate = (func) => async (req, res) => {
    if (!process.env.JWT_TOKEN) {
        console.error('JWT_TOKEN environment variable is required');

        return res.status(500).json(new UserError(
            'Authentication failed due to an internal error, please contact me'));
    }

    if (!req.headers.authorization) {
        return res.status(401).json(new UserError('Missing authorization header'));
    }

    const token = req.headers.authorization.split('Bearer ')[1];

    if (!token) {
        return res.status(401).json(new UserError('No token provided'));
    }

    try {
        const { name } = jwt.verify(token);

        const user = await User.findOne({ name });

        if (!user) {
            return res.status(401).json(new UserError('Couldn\'t find user'));
        }

        try {
            return func ? func(req, res, { user }) : true;
        } catch (err) {
            return res.status(500).json(new UserError('Internal error', 500));
        }
    } catch (err) {
        return res.status(401).json(new UserError('Invalid token'));
    }
};
