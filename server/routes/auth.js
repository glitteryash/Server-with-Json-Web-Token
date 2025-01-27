const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;

router.use((req, res, next) => {
  console.log("A request is coming in to /auth");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = { message: "Test API route is working" };
  return res.json(msgObj);
});

router.post("/register", (req, res) => {
  console.log("register route is working");
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
});

module.exports = router;
