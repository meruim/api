const axios = require("axios");
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "imagine",
    version: "1.0",
    author: "ViLLAVER",
    countDown: 5,
    role: 0,
    category: "ai",
  },
  onStart: async function () {},
  onChat: async function ({
    message,
    event,
    args,
    commandName,
    api,
    usersData,
  }) {
    const input = event.body;
    const userID = event.senderID;
    const tid = event.threadID;
    const data = await usersData.get(userID);
    const status = data.banned.status;
    const reason = data.banned.reason;
    const name = data.name;
    const author = this.config.author;
    let images = "";
    const approve = ["6691783234215885", "6561347957281741"];

    if (
      input &&
      (input.trim().toLowerCase().startsWith("imagine") ||
        input.trim().toLowerCase().startsWith("dalle"))
    ) {
      if (!approve.includes(tid)) return;
      if (status === true) {
        return message.reply(
          `⚠ | You have been banned from using the bot\n❍Reason: ${reason}\n❏Please contact the admin in this group to request for a compliment.`
        );
      }
      const inputData = input.split(" ");
      inputData.shift();
      const prompt = inputData.join(" ");

      if (!prompt) {
        const responses = [
          "Please add your prompt, and I'll transform your ideas into AI-generated imagery.",
          "Feel free to add your prompt, and I'll generate a unique and memorable creation for you",
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        return message.reply(`${randomResponse}`);
      }
      const waitingQue = await message.reply("🎨 | Creating your imagination...");

      try {
        const response = await axios.get(
          `https://api-t86a.onrender.com/api/imagine?prompt=${prompt}`
        );
        const result = response.data;
        let content = result.result;
        let attachment = [];
        if (response.status === 400) {
          return message.reply(`Error: ${response.data.error}`);
        }
        if (result.images && result.images.length > 0) {
          for (let url of result.images) {
            try {
              const stream = await getStreamFromURL(url);
              if (stream) {
                attachment.push(stream);
              }
            } catch (error) {
              console.error(`error: ${url}`);
            }
          }
        }

        await message.reply({
          body: "✅ | Here's the generated images from your prompt.",
          attachment: attachment
        });

      } catch (error) {
        console.error("Error:", error.message);
        api.sendMessage(`Please Try Again With Different Prompt`, event.threadID, event.messageID);
      }
    }
  }
};