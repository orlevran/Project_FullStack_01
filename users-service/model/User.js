const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema, 'Users'); // 'Users' is the collection name in MongoDB
// The third parameter is optional; if not provided, Mongoose will use the pluralized version of the model name as the collection name.
// In this case, it will use 'users' as the collection name, but we explicitly set it to 'Users' to match the naming convention used in the original code.