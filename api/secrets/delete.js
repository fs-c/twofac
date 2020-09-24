const { authenticate } = require('../utils');

module.exports = authenticate(async (req, res, { user }) => {    
    const { length } = user.secrets;
    user.secrets = user.secrets.filter(
        (s) => s.alias !== req.body.alias
    );

    await user.save();

    const deleted = length - user.secrets.length;
    res.json({ status: { success: deleted !== 0, deleted } });
});
