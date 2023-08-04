const express = require("express");

const empRouter = require("./empRouters");

const commonRouter = express.Router();

commonRouter.use("/employee", empRouter);

module.exports = commonRouter;
