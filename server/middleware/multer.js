const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary"); // multer-storage-cloudinary 是一個用來將檔案上傳到 Cloudinary 的 middleware

// 設定上傳圖片的雲端儲存位置
// 設定使用者圖片物件
const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ProfileImages",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [
      {
        width: 350,
        height: 350,
        crop: "thumb",
        gravity: "face",
        radius: "max",
      },
    ],
  },
});

//設定課程圖片物件
const courseStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "CourseImages",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [
      {
        width: 600,
        height: 400,
        crop: "fill",
      },
    ],
  },
});

const uploadProfile = multer({ storage: profileStorage });
const uploadCourse = multer({ storage: courseStorage });

module.exports = { uploadProfile, uploadCourse };
