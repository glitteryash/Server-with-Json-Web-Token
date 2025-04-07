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
    let course = await Course.find({ instructor: _instructor_id }).populate(
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

//藉由學生id確認課程
router.get("/student/:_student_id", async (req, res) => {
  try {
    let { _student_id } = req.params;
    let course = await Course.find({ students: _student_id }).populate(
      "instructor",
      ["username", "email"]
    );
    if (!course) {
      return res.status(404).send("course not found");
    }
    res.status(200).send(course);
  } catch (err) {
    res.status(500).send(err.massage);
  }
});

//搜尋課程
router.get("/findbyname/:name", async (req, res) => {
  try {
    let { name } = req.params;
    let course = await Course.find({
      title: { $regex: name, $options: "i" }, //模糊搜尋且不區分大小寫
    }).populate("instructor", ["username", "email"]);
    if (course.length === 0) {
      return res.status(404).send("course not found");
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

//講師新增課程
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

//學生選課
router.post("/enroll/:course_id", async (req, res) => {
  try {
    let { course_id } = req.params;
    let { student_id } = req.body;
    let course = await Course.findOne({ _id: course_id });
    if (!course) {
      return res.status(404).send("Course not found");
    }

    //檢查學生是否已經選過這門課
    if (course.students.includes(student_id)) {
      return res.status(400).send("You have already enrolled in this course");
    }

    course.students.push(student_id);
    await course.save();
    res.status(200).send({
      msg: "You have successfully enrolled in the course",
      course, //回傳課程資料
    });
  } catch (err) {
    res.status(500).send(err.message);
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
