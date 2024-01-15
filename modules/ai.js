module.exports = {
  run: async function({
    axios, app, requestHandler
  }) {

    app.get('/api/ai', async (req, res)=> {
      let {
        prompt, uid, name
      } = req.query

      if (!prompt || !uid) {
        return res.status(400).json({
          error: "Missing 'prompt' and 'uid' parameter!"
        });
      }

      const handle = await requestHandler.userRequest(uid, name);
      if (handle) {
        return res.json({
          result: handle.error
        });
      }

      try {
        const response = await axios.get(`https://hercai.onrender.com/gemini/hercai?question=${encodeURIComponent(prompt)}`);
        if (response.data) {
          const {
            reply
          } = response.data;
          if (!reply) return;
          if (reply == "Question Error!") return;
          res.json({
            result: reply
          });
          return;
        }
      } catch (error) {
        console.error("Error:", error.message);
      }

      try {
        const response = await axios.get(`https://api.kenliejugarap.com/ai/?text=${encodeURIComponent(prompt)}`);

        if (response.data && response.data.response) {
          const result = response.data.response;
          const textToRemove = "\n\nIs this answer helpful to you? Kindly click the link below\nhttps://click2donate.kenliejugarap.com\n(Clicking the link and clicking any ads or button and wait for 30 seconds (3 times) everyday is a big donation and help to us to maintain the servers, last longer, and upgrade servers in the future)";
          const cleanedResult = result && result.endsWith(textToRemove)
          ? result.slice(0, -textToRemove.length): result;

          res.json({
            result: cleanedResult
          });
          return;
        } else {
          console.error(error);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }

      try {
        const response = await axios.get(`https://api.easy-api.online/v1/globalgpt?q=${encodeURIComponent(prompt)}`);
        if (response.data) {
          const {
            content
          } = response.data;
          res.json({
            result: content
          });
          return;
        }
      } catch (error) {
        console.error("Error:", error.message);
      }




      res.status(500).json({
        result: "Internal Server Error"
      });
    });
  },
};