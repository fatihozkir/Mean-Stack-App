const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { TokenExpirationTime } = require("../utils/constants/statics");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      const isValidEmail = validator.default.isEmail(value);
      if (!isValidEmail) {
        throw new Error("Invalid Email Address!");
      }
    },
  },
  password: { type: String, required: true },
  token: { type: String },
});

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "creator",
});

userSchema.plugin(uniqueValidator);
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: TokenExpirationTime,
    }
  );
  user.token = token;
  await user.save();
  return token;
};
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  const errorMessage = "Unable to login!";
  if (!user) throw new Error(errorMessage);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error(errorMessage);
  return user;
};
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};
//before the save process it gets the current user object and hashes the password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
