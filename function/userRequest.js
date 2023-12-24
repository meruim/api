const fs = require("fs");
const path = require("path");
const tm = require('./dateAndTime.js');
const jsonFilePath = path.join(__dirname, "../data/usersInfo.json");
const config = require("../data/config.json");

const addRequests = (id, numberOfRequests) => {
  let jsonData;
  try {
    jsonData = JSON.parse(fs.readFileSync(jsonFilePath));
  } catch (error) {
    jsonData = [];
  }

  const existingUserIndex = jsonData.findIndex((entry) => entry.id === parseInt(id));

  if (existingUserIndex !== -1) {
    const user = jsonData[existingUserIndex];

    if (user.RequestLeft >= 0) {
      user.RequestLeft += numberOfRequests;
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

      console.log(tm().yellow, `[ ID:${id} ]`.blue.bold, `=>`.magenta + ` Added ${numberOfRequests} requests. Total requests left: ${user.RequestLeft}`.green);
      return { message: { add: numberOfRequests, requestLeft: user.RequestLeft } };
    } else {
      console.log(tm().yellow, `[ ID:${id} ]`.blue.bold, `=>`.magenta + ` Add specific value to add.`.red);
      return { error: 'Add a specific value to add.' };
    }
  } else {
    console.log(tm().yellow, `[ ID:${id} ]`.blue.bold, `=>`.magenta + ` User not found. Cannot add requests.`.red);
    return { error: 'User not found. Cannot add requests.' };
  }
};

const getRequestLimitById = (id) => {
  let jsonData;
  try {
    jsonData = JSON.parse(fs.readFileSync(jsonFilePath));
  } catch (error) {
    jsonData = [];
  }

  const existingUser = jsonData.find((entry) => entry.id === parseInt(id));

  if (existingUser) {
    const requestLeft = existingUser.RequestLeft;
    const name = existingUser.FullName;
    return { requestLeft: requestLeft, name: name };
  } else {
    return {error: `User ${id} not found!`};
  }
};

const getUser = (id, name, requestleft) => {
  let jsonData;
  try {
    jsonData = JSON.parse(fs.readFileSync(jsonFilePath));
  } catch (error) {
    jsonData = [];
  }

  const existingUserIndex = jsonData.findIndex(
    (entry) => entry.id === parseInt(id)
  );

  if (existingUserIndex !== -1) {
    return jsonData[existingUserIndex];
  }

  const user = {
    id: parseInt(id),
    FullName: name || null,
    RequestLeft: parseInt(requestleft || 30),
  };

  jsonData.push(user);
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
  const details = tm().yellow +
    `\nNew User:\n`.green +
    `ID: ${user.id}\nName: ${name}\nRequest Left: ${user.RequestLeft}`;

  if (user) {
    console.log(details);
  } else {
    return { success: false, error: "Failed to register the user" };
  }
  return { data: { id: user.id, name: user.FullName, requestLeft: user.RequestLeft } };
};

//userRequest
const userRequest = (id, name) => {
  let jsonData;
  try {
    jsonData = JSON.parse(fs.readFileSync(jsonFilePath));
  } catch (error) {
    jsonData = [];
  }
//
  const idToCheck = parseInt(id);

  if (Array.isArray(config) && config.length > 0) {
    const adminIDs = config[0].adminID;
    const isAdmin = adminIDs.includes(idToCheck);

    if (isAdmin) {
      return console.log("Admin is Accessing!");
    }
  }
//
  const existingUserIndex = jsonData.findIndex((entry) => entry.id === parseInt(id));

  if (existingUserIndex !== -1) {
    const user = jsonData[existingUserIndex];

    if (user.RequestLeft > 0) {
      user.RequestLeft--;

      if (user.FullName !== name) {
        user.FullName = name;
        console.log(`[ ID: ${id} ]`.blue, `=>`.magenta, `Successfully changed name to: "${name}"\n`.green);
      }

      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

      const currentRequest = getRequestLimitById(id);

      return console.log(tm().yellow, `[ ID:${id} ]`.blue.bold, `=>`.magenta + ` request has been successfully processed.`.green);
    } else {
      console.log(tm().yellow, `[ ID:${id} ]`.blue.bold, `=>`.magenta + ` has reached the limit of requests.`.red);
      return {
        error: `${name}, your request limit has reached zero.`,
      };
    }
  } else {
    const user = getUser(id, name);

    if (user) {
      return console.log(`Registered successfully!\n`.green);
    } else {
      return { error: "Failed to register the user" };
    }
  }
};

module.exports = { userRequest, getRequestLimitById, getUser, addRequests };
