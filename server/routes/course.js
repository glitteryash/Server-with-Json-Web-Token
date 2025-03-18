const router = require("express").Router();
const courseValidation = require("../validation").courseValidation;
const Course = require("../models").courseModel;

router.use((req, res, next) => {
  console.log("A request is coming in to /course");
  next();
});

//全部課程
router.get("/", async (req, res) => {
  try {
    let courses = await Course.find({}).populate("instructor", [
      "username",
      "email",
      //等同於"username email"
    ]);
    res.status(200).send(courses);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//藉由instructor id確認課程
router.get("/instructor/:_instructor_id", async (req, res) => {
  try {
    let { _instructor_id } = req.params;
    let course = await Course.findOne({ instructor: _instructor_id }).populate(
      "instructor",
      ["username", "email"]
    );
    if (!course) {
      return res.status(404).send("Course not found");
    }
    res.status(200).send(course);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//確認特定課程
router.get("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let course = await Course.findOne({ _id }).populate("instructor", [
      "username",
      "email",
    ]);
    if (!course) {
      return res.status(404).send("Course not found");
    }
    res.status(200).send(course);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  //新增前先確認需入內容是否符合規範
  const { error } = courseValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //驗證身份是否可新增課程
  if (req.user.isStudent()) {
    return res.status(401).send("You are not authorized to create a course.");
  }
  const { title, description, price } = req.body;
  let newCourse = new Course({
    title,
    description,
    price,
    instructor: req.user._id,
  });
  try {
    await newCourse.save();
    res.status(200).send({
      msg: "Course has been saved successfully",
      data: newCourse,
    });
    console.log("User ID:", req.user._id);
  } catch (err) {
    res
      .status(400)
      .send({ msg: "Course could not be saved", error: err.message });
  }
});

router.patch("/:_id", async (req, res) => {
  const { error } = courseValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    let { _id } = req.params;
    let course = await Course.findOne({ _id });
    if (!course)
      return res.status(404).json({ success: false, msg: "Course not found" });
    if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
      let updatedCourse = await Course.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        msg: "Course has been updated",
        course: updatedCourse,
      });
    } else {
      return res.status(403).json({
        success: false,
        msg: "Only the instructor of the course or admin can edit",
      });
    }
  } catch (err) {
    res.status(400).send({ msg: "update unsuccessful", error: err.message });
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    const course = await Course.findOne({ _id });
    if (!course)
      return res.status(404).json({ success: false, msg: "Course not found" });

    if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
      await Course.deleteOne({ _id });
      res.status(200).json({
        success: true,
        msg: "The course has been deleted",
      });
    } else {
      return res.status(403).json({
        success: false,
        msg: "Only the instructor of this course or admin can delete",
      });
    }
  } catch (err) {
    res.status(400).send({ msg: "delete unsuccessful", error: err.message });
  }
});

module.exports = router;
