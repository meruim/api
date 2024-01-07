module.exports ={
  run: async function({app,fs,path,express, ytdl, yts, requestHandler}){
    app.get('/api/video', async (req, res) => {

      try {
        let { title, uid, name } = req.query
        app.use('/video', express.static(path.join(__dirname, 'cache')));

        if (!title) {
          return res.status(400).json({ error: "Missing 'title' and 'uid' parameter!" });
        }

      const handle = await requestHandler.userRequest(uid, name );
        if (handle) {
          return res.json({result: handle.error});
        }

        const searchResults = await yts(title);

        if (!searchResults.videos.length) {
          return res.json({ error: 'No matching videos found' });
        }

        const video = searchResults.videos[0];
        const videoUrl = video.url;

        const stream = ytdl(videoUrl, { filter: 'audioandvideo' });

        const fileName = `${title}.mp4`;
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

          if (fs.statSync(filePath).size > 83886080) {
            fs.unlinkSync(filePath);
            return res.json({ error: 'The file is larger than 80MB' });
          }

          const message = {
            title: video.title,
            video: `https://api-t86a.onrender.com/video/${fileName}`
          };

      res.json(message);

          setTimeout(() => {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
              console.info('[DOWNLOADER] File deleted from cache');
            }
          }, 500000); //10minuto

          });
      } catch (error) {
        console.error('[ERROR]', error);
        res.status(500).json({ error: 'Internal Server Error.' });
      }
    });
  }
};