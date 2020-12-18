import express from 'express';
import multer from 'multer';
import path from 'path';
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

const checkFileType = (file, cb) => {
  const fileTypes = /jpg|jpeg|png/;
  // console.log(file);
  console.log(file);
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype.replace('image/'));
  console.log('hena');
  console.log(extname && mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

router.post('/', upload.single('image'), (req, res) => {
  if (req.file) {
    console.log(req.headers);
    res.send(`${req.protocol}://${req.get('host')}/${req.file.path}`);
  } else {
    throw new Error('Bad file extension');
  }
});
export default router;
