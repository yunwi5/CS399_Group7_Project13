const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        minLength: 7,
        lowercase: true,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    exercises: [{type: mongoose.Schema.Type.ObjectID, ref: "Exercise"}],
    submissions: [{type: mongoose.Schema.Type.ObjectID, ref: "UserSubmission"}],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
