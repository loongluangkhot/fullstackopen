const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.get("", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.json(users);
});

router.post("", async (request, response) => {
  const body = request.body;
  const username = body.username;
  const password = body.password;
  if (!username || username.length < 3) {
    const err = new Error("Username must be at least 3 characters long");
    err.name = "ValidationError";
    throw err;
  } else if (!password || password.length < 3) {
    const err = new Error("Password must be at least 3 characters long");
    err.name = "ValidationError";
    throw err;
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    name: body.name,
    username,
    passwordHash,
  });
  const savedUser = await user.save();
  response.json(savedUser);
});

module.exports = router;
