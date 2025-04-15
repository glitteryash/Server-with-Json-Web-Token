require("dotenv").config(); //載入dotenv，一定要寫在最前面
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const cors = require("cors");

const passport = require("passport");
require("./config/passport")(passport); // 將 passport 實例傳遞到設定函式，來進行認證策略的設定
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
//cors middleware,一定要放在路由之前
app.use(cors());

//Routes
app.use("/api/user", authRoute);
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);
app.get("/", (req, res) => {
  res.send("homepage");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
