require("dotenv").config();
const express = require("express");
require("./config/modelConfig");

const logger = require("./utils/logger");
const mainRouter = require("./urls");

const app = express();

const PORT = process.env.PORT || 8001;
const HOST = "localhost";

app.use(express.json());
app.use("/", mainRouter);

const server = app.listen(PORT, () => {
  logger.info(`server is running on http://${HOST}:${PORT}`);
  console.log(`server is running on PORT: ${PORT}`);
});

module.exports = server