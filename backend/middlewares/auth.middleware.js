const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const UserType = require("../models/userType.model");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(403).send("Forbidden");
  } else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT Payload:', decoded);
    const user = await User.findOne({ username: decoded.username }).select(
      "-password"
    );
    req.user = user;
    next();
  }
};

const adminMiddleware = async (req, res, next) => {
  try {
    const user = req.user;

    const adminUserType = await UserType.findOne({ type: "admin" });

    if (!user || !adminUserType || user.userType.toString() !== adminUserType._id.toString()) {
      return res.status(403).send("Forbidden. Admins only.");
    }

    next();
  } catch (error) {
    console.error("Error in admin middleware:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  authMiddleware,
  adminMiddleware,
};