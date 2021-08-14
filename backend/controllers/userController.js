const { StatusCode } = require("status-code-enum");
const User = require("../models/user");
const { TokenExpirationSecond } = require("../utils/constants/statics");
const signUp = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    await user.generateAuthToken();
    const userObject = user.toJSON();
    delete userObject.password;
    res
      .status(StatusCode.SuccessCreated)
      .send({ user: userObject, tokenExpiration: TokenExpirationSecond });
  } catch (error) {
    res.status(StatusCode.ClientErrorBadRequest).send({
      message: "Invalid authentication credentials!",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    await user.generateAuthToken();
    const userObject = user.toJSON();
    delete userObject.password;

    res.send({ user: userObject, tokenExpiration: TokenExpirationSecond });
  } catch (error) {
    res.status(StatusCode.ClientErrorUnauthorized).send({
      message: "Invalid authentication credentials!",
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  signUp,
  login,
  getUserProfile,
};
