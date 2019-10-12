const mongoose = require('mongoose');

// The actual input validation should occur before this, but some sane limits 
// are still enforced here.
const UserSchema = new mongoose.Schema({
    name: { type: String, index: { unique: true },
        minlength: 1, maxlength: 1024 },
    password: { type: String },
    secrets: [{ alias: String, raw: String, salt: String, vector: String }],    
});

const User = exports.User = mongoose.model('User', UserSchema);
