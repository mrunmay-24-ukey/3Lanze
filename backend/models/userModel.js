const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  blockChainAddress: {
    type: String,
    required: true,
  },
});

// static sign up function
userSchema.statics.signup = async function (
  email,
  password,
  blockChainAddress
) {

  // validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is invalid");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
    );
  }

  // check if blockChainAddress is unique
  if (!blockChainAddress) {
    console.log(blockChainAddress);
    throw new Error("Block chain address is required");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({
    email,
    password: hashedPassword,
    blockChainAddress,
  });

  return user;
};

// static login function
userSchema.statics.login = async function (email, password, blockChainAddress) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
