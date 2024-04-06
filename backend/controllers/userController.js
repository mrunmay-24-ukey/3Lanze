const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, `${process.env.JWT_SECRET}`, {
    expiresIn: "1d",
  });
};

// login a user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res
      .status(200)
      .json({ email, token, blockChainAddress: user.blockChainAddress });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, blockChainAddress } = req.body;

  try {
    const user = await User.signup(email, password, blockChainAddress);//sahi hai
    const token = createToken(user._id);

    res.status(200).json({ email, token, blockChainAddress });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { loginUser, signupUser };
