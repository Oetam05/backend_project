const User = require('./user.model');

const createUserMongo = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

module.exports = {
  createUserMongo,
  findUserByEmail
};
