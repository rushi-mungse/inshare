const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

const connectDb = () => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;

  connection.once("open", () => {
    console.log("Database connected.");
  });

  connection.on("error", console.error.bind(console, "connection error:"));
};

module.exports = connectDb;
