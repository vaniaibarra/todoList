const { Router } = require('express');
const router = Router();
const upload = require('../services/multerService');
const UploadController = require('../controllers/uploadController');
const { validateToken } = require('../middlewares/Auth');

router.post('/', validateToken, upload.single('avatar'), UploadController.uploadAvatar);

module.exports = router;
