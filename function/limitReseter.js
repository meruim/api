const fs = require('fs/promises');
const { DateTime } = require("luxon");
const path = require("path");
const schedule = require("node-schedule");

const usersInfoFilePath = path.join(__dirname, "../data/usersInfo.json");

async function loadUserData() {
  try {
    const data = await fs.readFile(usersInfoFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading user data:', error);
    return [];
  }
}

async function saveUserData(data) {
  try {
    await fs.writeFile(usersInfoFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving user data:', error);
  }
}

async function resetRequestLeft() {
  const currentTime = DateTime.now().setZone("Asia/Manila");
  const targetTime = currentTime.set({ hour: 0, minute: 00 });

  if (currentTime.equals(targetTime)) {
    const userData = await loadUserData();

    for (const user of userData) {
      user.RequestLeft = 30;
    }

    await saveUserData(userData);

    console.log("RequestLeft has been reset to 50 for all users.".green.bold);
  } else {
    console.log(
      "Current time does not match the target time. RequestLeft not reset."
        .yellow.bold
    );
  }
}

const rule = new schedule.RecurrenceRule();
rule.tz = 'Asia/Manila';
rule.hour = 0;
rule.minute = 00;
schedule.scheduleJob(rule, resetRequestLeft);

