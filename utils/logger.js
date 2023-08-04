const { createLogger, transports, format } = require("winston");
require("winston-mongodb");

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.Console({
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),

    new transports.File({
      filename: "logs/systemLogs/log_info.log",
      level: "info",
      maxsize: 5242880,
      maxFiles: 5,
      colorsize: false,
      // format: format.combine(format.timestamp(), format.json())
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) =>
            `level : ${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),

    new transports.File({
      filename: "logs/systemLogs/log_info.log",
      level: "error",
      maxsize: 5242880,
      maxFiles: 5,
      colorsize: false,
      // format: format.combine(format.timestamp(), format.json())
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (error) =>
            `level : ${error.level}: ${[error.timestamp]}: ${error.message}`
        )
      ),
    }),

    new transports.MongoDB({
      level: "info",
      db: process.env.DB,
      options: {
        useUnifiedTopology: true,
      },
      collection: "logData",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logger;
