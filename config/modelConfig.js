const mongoose = require("mongoose");

const logger = require("../utils/logger");

mongoose.connect(process.env.DB, {
  useNewUrlParser: "true",
});
mongoose.connection.on("error", () => {
  logger.log("error", "MongoDB is not connected");
});
mongoose.connection.on("connected", () => {
  logger.log("info", "MongoDB is connected");
});
