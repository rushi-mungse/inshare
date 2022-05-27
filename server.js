const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const router = require("./routes");

app.set("view engine", "ejs");
app.use(express.json());
app.use(router);
app.use(express.static("public"));
const connectDb = require("./utils/db");
connectDb();

const PORT = process.env.APP_PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
