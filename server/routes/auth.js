const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("A request is coming in to /auth");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = { message: "Test API route is working" };
  return res.json(msgObj);
});

//register
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
    res
      .status(400)
      .send({ msg: "User could not be saved", error: err.message });
  }
});

// login
// router.post("/login", (req, res) => {
//   const { error } = loginValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) {
//       res.status(400).send(err);
//     }
//     if (!user) {
//       res.status(401).send("User not found");
//     } else {
//       user.comparePassword(req.body.password, function (err, isMatch) {
//         if (err) return res.status(400).send(err);
//         if (isMatch) {
//           const tokenObject = {
//             _id: user._id,
//             email: user.email,
//           };
//           const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
//           res.send({ sucess: true, token: "JWT " + token, user });
//         } else {
//           res.status(401).send("Authentication failed");
//         }
//       });
//     }
//   });
// });

router.post("/login", async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User not found");

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      const tokenObject = { _id: user._id, email: user.email };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.send({ success: true, token: "JWT" + token, user });
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
