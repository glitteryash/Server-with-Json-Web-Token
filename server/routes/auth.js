const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");
const { uploadProfile, uploadCourse } = require("../middleware/multer");

router.use((req, res, next) => {
  console.log("A request is coming in to /auth");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = { message: "Test API route is working" };
  return res.json(msgObj);
});

//register
router.post("/register", uploadProfile.single("avatar"), async (req, res) => {
  try {
    console.log("register route is working");
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // check if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email has already been used.");

    //chech if the avatar is uploaded
    const avatarUrl = req.file
      ? req.file.path
      : "https://res.cloudinary.com/dt5ybgxgz/image/upload/v1744614681/23630343_1_iyuagg.png"; //預設圖片

    // create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      profileImage: avatarUrl,
    });

    const savedUser = await newUser.save();
    res.status(200).send({
      msg: "User has been saved successfully",
      data: savedUser,
    });
  } catch (err) {
    console.error("Upload or saving failed:", err);
    res
      .status(400)
      .send({ msg: "User could not be saved", error: err.message });
  }
});

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
      return res.send({ success: true, token: `jwt ` + token, user });
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
