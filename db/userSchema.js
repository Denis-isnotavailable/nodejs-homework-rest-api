const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
        },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
    },
    avatarURL: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
    }, { versionKey: false, timestamps: true },
);

userSchema.pre('save', async function() {
  if (this.isNew || this.isModified) {
    this.password = await bcrypt.hash(this.password, 10);
  };
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};