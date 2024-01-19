module.exports = {
  run: async function ({
    app, requestHandler, axios, leaderboards
  }) {
    app.get("/api/leaderboards", async (req, res) => {
      const {
        id, name, prompt, trophy
      } = req.query;

      if (prompt && prompt.length > 2) {
        if (!id) {
          return res.status(500).json({
            error: "Missing id",
          });
        }
        if (prompt.toLowerCase() === "inc") {
          try {
            const handle = await leaderboards.inc({
              id: id,
              name: name,
              trophy: parseInt(trophy),
            });
            res.json(handle);
            return;
          } catch (error) {
            return res.json(error);
          }
        } else if (prompt.toLowerCase() === "dec") {
          try {
            const handle = await leaderboards.dec({
              id: id,
              name: name,id:
              trophy: parseInt(trophy),
            });
            res.json(handle);
            return;
          } catch (error) {
            return res.json(error);
          }
        }
      } else {
        try {
          const handle = await leaderboards.leaderBoards();
          res.json({
            result: `🏆𝗧𝗢𝗣 𝗚𝗟𝗢𝗕𝗔𝗟🏆\n\n${handle}`,
          });
          return;
        } catch (error) {
          return res.json(error);
        }
      }
    });
  },
};