const express = require("express");

const {createNotification} = require("../controllers/notificationController");

const notificationRouter = express.Router();

notificationRouter.post("/create/:id", createNotification)

module.exports = notificationRouter