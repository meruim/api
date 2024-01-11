module.exports = {
  run: async function ({
    app, fs, path, express, axios, request, ytdl, yts, requestHandler
  }) {
    app.get('/api/lyrics', async (req, res) => {
      try {
        const {
          song
        } = req.query;

        if (!song) {
          return res.status(400).json({
            error: "Missing 'song' parameter!"
          });
        }

        const lyricsApiUrl = `https://chards-api.replit.app/api/lyrics/song?title=${encodeURIComponent(song)}`;

        const lyricsResponse = await axios.get(lyricsApiUrl);
        const {
          title,
          artist,
          song_thumbnail,
          lyrics,
        } = lyricsResponse.data.content;

        const message = {
          title,
          image: `${song_thumbnail}`,
          artist,
          lyrics
        };

        res.json(message);
      } catch (error) {
        console.error('[ERROR]', error);
        res.status(500).json({
          error: 'Internal Server Error.'
        });
      }
    });
  }
};