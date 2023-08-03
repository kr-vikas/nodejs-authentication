const UserModel = require('./users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.register = async (payload) => {
  const { email, passwordHash, userName } = payload ?? {};
  const isUserExists = await UserModel.findOne({ $or: [{ email }, { userName }] }).lean().exec();
  if (isUserExists) {
    throw new Error('Email or userName already exists');
  }
  const user = new UserModel({ email, passwordHash, userName });
  await user.save();
  return { user, message: 'User created successfully!' };
};

module.exports.login = async (payload) => {
  const { password, userName } = payload ?? {};
  const isUserExists = await UserModel.findOne({ userName }).lean().exec();
  if (!isUserExists) {
    throw new Error('User not found!');
  }
  const isPasswordValid = bcrypt.compareSync(password, isUserExists.passwordHash);
  if (!isPasswordValid) {
    throw new Error('Invalid password!');
  }
  const token = jwt.sign({ id: isUserExists._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRATION_TIME });
  return { token, message: 'Login successful!' };
};

module.exports.getProfile = async (id) => {
  const user = await UserModel.findById(id).lean().exec();
  if (!id) {
    throw new Error(`User not found with id #${id}!`);
  }
  return { user, message: 'User details fetched successful!' };
};