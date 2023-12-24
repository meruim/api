module.exports = {
  run: async function ({ app, requestHandler, axios }) {
    app.get("/users", async (req, res) => {
      const { id, name, prompt } = req.query;
      if (!id) {
        return res.status(400).json({
          error: "Missing id",
        });
      }

      /*
      try{
      const handle = await requestHandler.getRequestLimitById(id);
      res.status(200).json(handle)
      }catch(e){
        res.status(400).json(e);
      }
      */
      /*
      const handle = await requestHandler.getUser(id);
      const data = handle.data;
      res.status(500).json(data);
      
      */

      /*
      const handle = await requestHandler.addRequests(id, 50);
      if (handle.message) {
        res.status(200).json(handle.message);
      } else {
        res.status(500).json({ error: handle.error });
      }
      */
      /*
      const handle = await requestHandler.userRequest(id, name,requestleft );
      if (handle) {
        res.status(500).json({ error: handle.error });
      }
      */
    });
  },
};
