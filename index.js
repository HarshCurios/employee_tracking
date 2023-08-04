require("dotenv").config();
const express = require("express");
require("./config/modelConfig");

const logger = require("./utils/logger");
const commonRouter = require("./routers/mainRouter");

const app = express();

const PORT = process.env.PORT || 8001;
const HOST = "localhost";

app.use(express.json());
app.use("/", commonRouter);

const server = app.listen(PORT, () => {
  logger.info(`server started and running on http://${HOST}:${PORT}`);
  console.log(`server is running on PORT: ${PORT}`);
});
