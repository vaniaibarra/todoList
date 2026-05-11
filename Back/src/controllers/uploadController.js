const cloudinaryService = require('../services/cloudinaryService');

const uploadAvatar = async (req, res) => {
    try {
        if(!req.file){
            return res.status(400).json({error: 'No se recibió ningún archivo'});
        }

        const result = await cloudinaryService.uploadToCloudinary(req.file.buffer);
        res.status(200).json({url: result.secure_url});

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error al subir la imagen'})
    }
};

module.exports = { uploadAvatar };