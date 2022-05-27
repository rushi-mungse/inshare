const multer = require("multer");
const path = require("path");
const File = require("../models/File");
const { v4: uuid4 } = require("uuid");
const base_url = process.env.BASE_URL;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 10e5
    )}.${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
}).single("myFile");

class UploadFileController {
  async uploadFile(req, res, next) {
    upload(req, res, async (err) => {
      if (!req.file) return res.json({ error: "All fields are required." });
      if (err) return res.status(500).json({ message: err.message });
      try {
        const response = await File.create({
          filename: req.file.filename,
          path: req.file.path,
          size: req.file.size,
          uuid: uuid4(),
        });
        return res
          .status(200)
          .json({ file: `${base_url}/file/${response.uuid}` });
      } catch (error) {
        return res.status(401).json({ error: "Internal server error" });
      }
    });
  }

  async file(req, res, next) {
    try {
      const file = await File.findOne({ uuid: req.params.uuid });
      if (!file)
        return res.render("download", { error: "Link hash been expired." });
      return res.render("download", {
        filename: file.filename,
        size: file.size,
        uuid: file.uuid,
        downloadLink: `${base_url}/file/download/${file.uuid}`,
      });
    } catch (error) {
      return res.render("download", { error: "Internal server error" });
    }
  }

  async downloadFile(req, res, next) {
    try {
      const file = await File.findOne({ uuid: req.params.uuid });
      if (!file)
        return res.render("download", { error: "Link has been expired." });
      const filepath = `${__dirname}/../${file.path}`;
      return res.download(filepath);
    } catch (error) {
      return res.render("download", { error: "Internal server error" });
    }
  }
}

module.exports = new UploadFileController();
