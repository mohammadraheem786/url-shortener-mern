import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp' },
  __v: { type: Number, select: false },
});

const User = mongoose.model('User', userSchema);

export const createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email }).select('+password'); // Ensure password is selected
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};
export const findUserById = async (id) => {
  try {
    return await User.findById(id).select('+password'); // Ensure password is selected
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};