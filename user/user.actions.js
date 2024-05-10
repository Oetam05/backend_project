const User = require('./user.model');
const bcrypt = require('bcryptjs');

const createUserMongo = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const findUserById = async (id) => { return await User.findById(id,'-password'); };

const updateUser = async (userId, updates) => {
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 12);
  }

  const user = await User.findOneAndUpdate({ _id: userId, isActive: true }, updates, { new: true });
  return user;
};

const deactivateUser = async (userId) => {
  const user = await User.findOneAndUpdate({ _id: userId, isActive: true }, { isActive: false }, { new: true });
  return user;
};

module.exports = {
  createUserMongo,
  findUserByEmail,
  findUserById,
  updateUser,
  deactivateUser,
};
