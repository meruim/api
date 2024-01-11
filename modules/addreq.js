module.exports = {
  run: async function ({ app, requestHandler, axios, utils }) {
    app.get("/api/add", async (req, res) => {
      const { id, value } = req.query;

      if (!id || !value) {
        return res.status(400).json({
          error: "Missing id or value",
        });
      }

      try {
        const result = await utils.addRequestLimitById(id, parseInt(value));
        res.json(result);
      } catch (error) {
        console.error("Error adding request limit:", error);
        res.status(500).json({
          error: "Internal Server Error",
        });
      }
    });
  },
};
