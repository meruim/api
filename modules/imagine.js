module.exports = {
  run: async function ({
    app, axios
  }) {
    app.get('/api/imagine', async (req, res) => {
      try {
        const {
          prompt
        } = req.query;

        if (!prompt) {
          return res.status(400).json({
            error: "Missing 'prompt' parameter!"
          });
        }

        const data = {
          prompt,
          cookie: '1WmXMUD8Hjd8oQtFWsvlKRmrRjVrBJr2hYKRLPi0v4r9v5UafKhp6-gvi98EZLI9hooXXF3XbItkKU5aHL724QVatG49WIhNi4t1m-eJ5d5HWGOVlr8XNjAwFrZ6PGzshmxEjZQljbk4FVdxkoXFCu2EWV1eyHgq5QTIZTrgxj2Svd9R5NQTKz0YdEVAUl1NPwl8T_3UAwd2NqX6ddroG6ty_eroN_lHhmEtn1iwnaoE'
        };

        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const response = await axios.post('https://project-dallee3.onrender.com/dalle', data, config);

        if (response.status === 200) {
          const imageUrls = response.data.image_urls.filter(url => !url.endsWith('.svg'));

          res.json({
            success: true,
            message: 'Images generated successfully',
            imageUrls
          });
        } else {
          throw new Error("Non-200 status code received");
        }
      } catch (error) {
        console.error(`${error}`);
        res.status(500).json({
          error: 'Internal Server Error.'
        });
      }
    });
  }
};