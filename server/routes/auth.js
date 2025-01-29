const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const User = require("../models").userModel;

router.use((req, res, next) => {
  console.log("A request is coming in to /auth");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = { message: "Test API route is working" };
  return res.json(msgObj);
});

router.post("/register", async (req, res) => {
  console.log("register route is working");
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // check if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email has already been used.");
  // create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({
      msg: "User has been saved successfully",
      data: savedUser,
    });
  } catch (err) {
    res.status(400).send("User could not be saved", err);
  }
});

module.exports = router;
