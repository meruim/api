module.exports = {
  run: async function ({ app, requestHandler, axios }) {
    app.get("/api/get", async (req, res) => {
      const { id, name, prompt } = req.query;

      if (!id) {
        return res.status(500).json({
          error: "Missing id",
        });
      }

      if(prompt === "getinfo".toLowerCase()) {
        try {
          const handle = await requestHandler.getRequestLimitById(id);
        res.json(handle);
          return
        } catch (e) {
         res.json(e);
          return;
        }
      }

      const handle = await requestHandler.userRequest(id, name );
      if (handle) {
        return res.status(400).json({error: handle.error});
      }
      return res.sendStatus(204);
    });
  },
};