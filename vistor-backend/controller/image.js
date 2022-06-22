const asynchandler = require('express-async-handler');

// upload image

const upload = asynchandler(async (req, res) => {
  if (req.files === null) {
    res.status(400);
    throw new Error('No file to uplod');
  }

  const file = req.files.file;

  file.mv(
    `/Users/sanabani/Desktop/REGASTER-VISTORS/vistor-frontend/public/imags/${file.name}`,
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res
        .status(200)
        .json({ fileName: file.name, filePath: `/imags/${file.name}` });
    }
  );
});

module.exports = {
  upload,
};
