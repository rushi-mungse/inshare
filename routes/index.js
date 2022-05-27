const routes = require("express").Router();
const UploadFileController = require("../controllers/uploadFileController");
const HomeController = require("../controllers/HomeController");

routes.get("/", HomeController.home);
routes.post("/api/upload-file", UploadFileController.uploadFile);
routes.get("/file/:uuid", UploadFileController.file);
routes.get("/file/download/:uuid", UploadFileController.downloadFile);

module.exports = routes;
