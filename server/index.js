const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/index").auth;
dotenv.config();
const passport = require("passport");
require("./config/passport")(passport);
//connect to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error(err);
  });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", authRoute);

app.get("/", (req, res) => {
  res.send("homepage");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
