const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { StatusCode } = require("status-code-enum");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({
      _id: decoded._id,
      token: token,
    });

    if (!user)
      throw new Error(
        "This user does not have authorization! User token might be expired or the user is not the owner of the process!"
      );

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    let errorMessage = "Please authenticate!";
    if (error) {
      errorMessage = error;
    }
    res
      .status(StatusCode.ClientErrorUnauthorized)
      .send({ error: errorMessage });
  }
};
module.exports = auth;
