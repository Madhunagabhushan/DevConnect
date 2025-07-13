// middleware/upload.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// For ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // create this 'uploads' folder in root
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = function (req, file, cb) {
  const allowedExt = ['.png', '.jpg', '.jpeg', '.pdf', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExt.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only images/documents are allowed'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
