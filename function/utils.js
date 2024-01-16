const fs = require("fs");
const path = require("path");
const tm = require('./dateAndTime.js');
const jsonFilePath = path.join(__dirname, "../data/usersInfo.json");

const addRequestLimitById = (id, amountToAdd) => {
  let jsonData;
  try {
    jsonData = JSON.parse(fs.readFileSync(jsonFilePath));
  } catch (error) {
    jsonData = [];
  }

  const existingUserIndex = jsonData.findIndex((entry) => entry.id === parseInt(id));

  if (existingUserIndex !== -1) {
    const user = jsonData[existingUserIndex];

    if (amountToAdd >= 0) {
      user.RequestLeft += amountToAdd;
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

      console.log(tm().yellow, `[ ID:${id} ]`.blue.bold, `=>`.magenta + ` Added ${amountToAdd} requests. Total requests left: ${user.RequestLeft}`.green);
      return { message: { add: amountToAdd, requestLeft: user.RequestLeft } };
    } else {
      console.log(tm().yellow, `[ ID:${id} ]`.blue.bold, `=>`.magenta + ` Add a valid positive amount to add.`.red);
      return { error: 'Add a valid positive amount to add.' };
    }
  } else {
    console.log(tm().yellow, `[ ID:${id} ]`.blue.bold, `=>`.magenta + ` User not found. Cannot add requests.`.red);
    return { error: 'User not found. Cannot add requests.' };
  }
};

module.exports = { addRequestLimitById };
