module.exports ={
  run: async function({axios, app, requestHandler}){

    app.get('/api/ai', async (req,res)=>{
      let { prompt, uid, name } = req.query

      if (!prompt || !uid) {
        return res.status(400).json({ error: "Missing 'prompt' and 'uid' parameter!" });
      }

      const handle = await requestHandler.userRequest(uid, name );
      if (handle) {
        return res.json({result: handle.error});
      }
      // try {
      //  const response = await axios.get(`https://gpt4.siam-apiproject.repl.co/api?uid=${uid}&query=${prompt}`);
      //   if (response.data) {
      //     const { lastAnswer } = response.data;
      //     if(!lastAnswer) return;
      //     res.json({ result: lastAnswer });
      //     return;
      //   }
      // } catch (error) {}
      
      try {
       const response = await axios.get(`https://chatgayfeyti.archashura.repl.co/?gpt=${encodeURIComponent(prompt)}`);
        if (response.data) {
          const { content } = response.data;
          res.json({ result: content });
          return;
        }
      } catch (error) {}

      try {
        const response = await axios.get(`https://free-api.chatbotcommunity.ltd/others/gpt?prompt=${encodeURIComponent(prompt)}`);

        if (response.data && response.data.result) {
          const message = response.data;
          res.json(message);
          return; 
        }
      } catch (error) {
        console.error(error);
        return;
      }
      res.status(400).json({ result: "Bad Request!" });
    });
  },
};