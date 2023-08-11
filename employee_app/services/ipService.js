const ip = require("ip");

module.exports = {
  ipAddress: async () => {
    empClockInIP = await ip.address();
    return { empClockInIP };
  },
};
