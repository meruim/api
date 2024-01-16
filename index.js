const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const fetch = require("node-fetch");
const colors = require("colors");
const requestHandler = require("./function/userRequest.js");
const utils = require("./function/utils.js");
const tm = require("./function/dateAndTime.js");
const timeReset = require("./function/limitReseter.js");
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const leaderboards = require("./function/leaderboardsHandler.js");
const API = ['ai', 'test', 'getUser', 'bard', 'sing', 'video', 'gimage', 'lyrics', 'addreq', 'imagine', 'emojiGame', 'leaderboards'];

API.forEach((modulesName) => {
  const moduleStyled = `${modulesName}`.blue.bold.underline;
  try {
    const modulePath = `${__dirname}/modules/${modulesName}.js`;
    const apiModule = require(modulePath);

    apiModule.run({
      axios, app, express, fs, path, fetch, requestHandler, colors, ytdl, yts, utils, leaderboards
    });

    console.log(tm().yellow, moduleStyled, `running successfully!`.green);
  } catch (error) {
    console.log(tm(), moduleStyled, `Error: ${error}`.red, error);
  }
});

app.get("/", (req, res) => {
  const author = "AJI-NO-MOTO";
  res.json(author);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  printTextArt(" A P I");
});

const figlet = require("figlet");

function printTextArt(message) {
  figlet(message, function(err, data) {
    if (err) {
      console.log("Error:", err);
      return;
    }
    console.log(
      "\n".blue
    );
    console.log(data.red);
    console.log(
      "\n".blue
    );
  });
}
module.exports = printTextArt;