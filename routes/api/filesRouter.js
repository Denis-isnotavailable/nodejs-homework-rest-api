const express = require('express');
const multer = require('multer');
const path = require('path');

const { uploadAvatarModel } = require('../../models/filesModel');
const { authMiddleware } = require('../../middelwares/authMiddleware');

const FILE_DIR_PUBLIC = path.resolve('./public/avatars');
const FILE_DIR_TMP = path.resolve('./tmp');

const filesRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILE_DIR_TMP);
    },
    filename: (req, file, cb) => {
        const [filename, extension] = file.originalname.split('.');
        cb(null, `${filename}.${extension}`);
    }
});

const uploadMiddleware = multer({storage});

filesRouter.use('/avatars', express.static(FILE_DIR_PUBLIC));

filesRouter.use(authMiddleware);
filesRouter.patch('/users/avatars', uploadMiddleware.single('avatar'), uploadAvatarModel);


module.exports = filesRouter;