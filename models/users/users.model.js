const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }
});

userModel.pre('save', function (next) {
  if (!this.isModified('passwordHash')) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.passwordHash = bcrypt.hashSync(this.passwordHash, salt);
  return next();
});

module.exports = mongoose.model('Users', userModel);