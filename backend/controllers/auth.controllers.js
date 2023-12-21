const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserType = require("../models/userType.model");

const register = async (req, res) => {
  const { username, password, firstName, lastName, profilePicture } = req.body;

  if (!username || !password || !firstName || !lastName) {
    return res.status(400).send({ message: "Required field left empty" });
  }

  try {
    const defaultUserType = await UserType.findOne({ type: "user" });

    const user = new User({
      username,
      password,
      firstName,
      lastName,
      profilePicture: req.body.profilePicture !== undefined ? profilePicture : null,
      userType: defaultUserType,
    });

    await user.save();

    return res.status(200).json({ user });
  } catch (e) {
    console.error("Error in registration:", e);
    return res.status(500).json({ error: e.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) res.status(400).send({ message: "Invalid username/password" });

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    res.status(400).send({ message: "Invalid username/password" });

  const { password: hashedPassword, _id, ...userDetails } = user.toJSON();

  // generate JWT token
  const token = jwt.sign(
    {
      ...userDetails,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2 days" }
  );

  res.status(200).send({
    user: userDetails,
    token,
  });
};

module.exports = {
  register,
  login,
};