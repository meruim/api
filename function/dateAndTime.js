function tm() {
  const { DateTime } = require("luxon");

  const manilaTimeZone = "Asia/Manila";

  const manilaNow = DateTime.now().setZone(manilaTimeZone);

  const formattedManilaDateTime = manilaNow.toFormat("yyyy-MM-dd HH:mm:ss");

  return formattedManilaDateTime;
}

module.exports = tm;