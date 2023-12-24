module.exports = {
  run: async function ({ app, fs, path, express, axios, request, ytdl, yts, requestHandler }) {
    app.get('/api/lyrics', async (req, res) => {
      try {
        const { song } = req.query;

        if (!song) {
          return res.status(400).json({ error: "Missing 'song' parameter!" });
        }

        const lyricsApiUrl = `https://api.heckerman06.repl.co/api/other/lyrics2?song=${encodeURIComponent(song)}`;

        const lyricsResponse = await axios.get(lyricsApiUrl);
        const { title, artist, lyrics, image } = lyricsResponse.data;

        const message = {
          title, image, artist, lyrics
        };

        res.json(message);
      } catch (error) {
        console.error('[ERROR]', error);
        res.status(500).json({ error: 'Internal Server Error.' });
      }
    });
  }
};
