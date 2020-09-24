const mongoose = require('mongoose');

// The actual input validation should occur before this, but some sane limits 
// are still enforced here.
const UserSchema = new mongoose.Schema({
    name: { type: String, index: { unique: true },
        minlength: 1, maxlength: 1024 },
    password: { type: String },
    secrets: [{ alias: String, raw: String, salt: String, vector: String }],    
});

const cache = {
    User: null,
    connection: null,
};

exports.connect = () => {
    if (cache.connection && cache.User) {
        return cache;
    }

    const { MONGODB_URI, MONGODB_NAME, MONGODB_PASSWORD } = process.env;
    const uri = `mongodb+srv://${MONGODB_NAME}:${MONGODB_PASSWORD}@`
        + MONGODB_URI;

	cache.connection = mongoose.createConnection(uri, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
    });

    cache.User = cache.connection.model('User', UserSchema);

    return cache;
};
