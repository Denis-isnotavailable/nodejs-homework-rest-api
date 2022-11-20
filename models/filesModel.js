const path = require('path');
// const fs = require('fs').promises;
const Jimp = require('jimp');

const { User } = require("../db/userSchema");

const uploadAvatarModel = async (req, res, next) => {    
    const id = req.user._id;
    const { path: temporaryName, originalname } = req.file;
    const extension = originalname.split(".")[1];
    const avatarDir = path.join('./public/avatars');
    const avatarName = path.join(avatarDir, `${id}.${extension}`);
    
    Jimp.read(temporaryName)
        .then(avatar => {
            return avatar
            .resize(250, 250) // resize         
            .write(avatarName); // save
        })
        .catch(err => console.error(err));
    
    // console.log(avatarName);
    try {
        // await fs.rename(temporaryName, avatarName);
        await User.update({ id }, { avatarURL: avatarName });
        res.json({ status: "success", avatarURL: avatarName });
    } catch (e) {
        // await fs.unlink(temporaryName);        
        next(e);
    }
}

module.exports = {
    uploadAvatarModel
}