module.exports ={
  run: async function({app,fs,path,express, ytdl, yts, requestHandler}){

    app.get('/api/sing', async (req, res) => {
      try {
        let { song, uid, name } = req.query
        app.use('/music', express.static(path.join(__dirname, 'cache')));

        if (!song && !uid) {
          return res.status(400).json({ error: "Missing 'song' and 'uid' parameter!" });
        }

        const handle = await requestHandler.userRequest(uid, name );
        if (handle) {
          return res.json({result: handle.error});
        }

        const searchResults = await yts(song);

        if (!searchResults.videos.length) {
          return res.status(400).json({ error: 'No matching videos found' });
        }

        const video = searchResults.videos[0];
        const videoUrl = video.url;

        const stream = ytdl(videoUrl, { filter: 'audioonly' });

        const fileName = `${song}.mp3`;
        const filePath = __dirname + `/cache/${fileName}`;

        stream.pipe(fs.createWriteStream(filePath));

        stream.on('response', () => {
          console.info('[DOWNLOADER]', 'Starting download now!');
        });

        stream.on('info', (info) => {
          console.info('[DOWNLOADER]', `Downloading ${info.videoDetails.title} by ${info.videoDetails.author.name}`);
        });

        stream.on('end', () => {
          console.info('[DOWNLOADER] Downloaded');

          if (fs.statSync(filePath).size > 26214400) {
            fs.unlinkSync(filePath);
            return res.status(400).json({ error: 'The file is larger than 25MB' });
          }

          const message = {
            title: video.title,
            music: `https://api-t86a.onrender.com/music/${fileName}`
          };

      res.json(message);

      setTimeout(() => {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
              console.info('[DOWNLOADER] File deleted from cache');
            }
          }, 300000); //5minuto

          });
      } catch (error) {
        console.error('[ERROR]', error);
        res.status(500).json({ error: 'Internal Server Error.' });
      }
    });
  }
};