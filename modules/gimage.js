module.exports = {
  run: async function ({ axios, app, express, requestHandler }) {
    const endpoint = 'https://api.easy-api.online/api/gimage?q=';

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    app.get('/api/gimage', async (req, res) => {
      try {
        let { search, limit, name, uid } = req.query;
        console.log(search + limit);

        if (!search && !uid ) {
          return res.status(400).json({ error: 'Missing search and uid parameter!' });
        }
        
        const handle = await requestHandler.userRequest(uid, name );
        if (handle) {
          return res.json({result: handle.error});
        }
        

        if (limit > 20 || !limit) {
          limit = 6;
        }
        const response = await axios.get(endpoint + search);
        const images = response.data.data;

        shuffleArray(images);

        const limitedImages = images.slice(0, Math.min(limit, images.length));

        res.json({ data: limitedImages });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error.message);
      }
    });
  },
};
