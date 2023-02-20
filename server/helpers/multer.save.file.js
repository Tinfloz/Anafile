import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `uploads-${file.originalname}`)
    },
});

export const upload = multer({ storage: storage });