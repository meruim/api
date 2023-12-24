const axios = require("axios");

module.exports = {
  config: {
    name: "utrl",
    version: "1.0", 
    author: "ViLLAVER", 
    countDown: 5, 
    role: 0,
    category: "util"
  },

  onStart(){},
  onChat: async function ({ api, message, event}) {

    const input = event.body;

    if (input && input.trim().toLowerCase().startsWith('utrl')){
      const cmd = input.slice(4).trim();
      const uid = event.senderID;

    try{
      const response = await axios.get(`https://aji.no-moto.repl.co/api/get?id=${uid}&prompt=getinfo`);
      const result = response.data.requestLeft;
      message.reply(result);
    } catch (error) {

    }
  }
  }      
};
