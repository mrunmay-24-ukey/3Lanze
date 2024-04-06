const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //verify auth
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "You are not authorized",
    });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(_id).select("_id");
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "You are not authorized" });
  }
};
module.exports = requireAuth;
