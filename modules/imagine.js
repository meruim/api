module.exports = {
  run: async function ({
    app, axios
  }) {
    app.get('/api/imagine', async (req, res) => {
      const {
        prompt
      } = req.query;

      if (!prompt) {
        return res.status(400).json({
          error: "Missing 'prompt' parameter!"
        });
      }

      try {
        const _U = '1ZSz8eATNKVJ3pJoKLJSbyN-X8pAgj3MsewrXMFYfinE0nGnwV-qrsu6pfkkBx-N05xoG12XpvP-AS7DDNkT_qeiFC0fOqDYqR8lsk12LeTeye5zHm2I3YIZRms4qWNf9Tjm8wQwwi3lxDMnL5uQ7WAW67CZ44ASY5iEvDzuVzPPG7bZgyoBivSZkiYqckR9VMLi6zQQaSODOqgJehmOXuj_akQk5gsNMJJvcxsFrt78';
        const KievRPSSecAuth = 'FACSBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACLSEAVSBFtM1UASum460MUV2sKX+HY3dtFVCzf0HzAkG33joA6s8J758igZcXsxUWpXsP3U19LiICiDpogRZS4evSwDa0J+vEru1gUDVYXR0bMC2GqLZPWlNodqDN74yxPsXKkv8aAmdcUFGbdOAeHjqLOByTUxnECsLFfFYpsWPB6/2S6GrlpGEZoHqpu30tELyL7age7FCzLBUvEkI0ZbArVTJ1Mz/AGZApe78YllE1Q+VELbPiFQ/3vob2xBnPDBUtEczUeQdz7b8HhxTlLCNZYB5ncEJaCrPivLFubcXjmfNmBcMjVBLVGF2rr57m/swAqaGRLXzI3wdpDxkQSw6aAPqTAHWmB2TPQLmCwKPzRNDfWpeV6yXFBW2uoU2bH1IsxsCS7dMPy/sJV651lXIOaKef0iW3cCNSAkn9v8lDW58r2OoVNmSw46GPTGzBZkDQwFaBn4RBj7HAlSbncjtRSPicr+8nuPQPq/M3Vjx37UQWXP8nNZHEjKPyUfY8QjkTKxUAHjeag8q2x+Vfgk6heYDegBbUXjYoHXIBkwP9MlnLqvxfd3t4krIv7vI6z57dPBqolCJekao7AyXajbfJM3J3NgVULnWWWeRHQ4SF8Q+Rze2W7QnPQQmSg/dNr1YA4toMy1Z66uxuOLV1bnu7tjv3GDXxTapTRj4b3XbBP5S09QpG4ys0MefXdVvT0Ker2lROHsiX2Hkh+bVHOTwdRj2n5oLWvAZVouAGKazdcf8k3oUWM7VroTQhM7NWuqS8dHDqlnpSxVyckNmiLR7GGHwuiWNgIPtvmL45sry/NtxE7FxaGCipsM8UiS6B0ihlqbLDr6y/1jucEA6ZaW3Jhsr/xKWfPrJKIWLGdHBCn/CcgycfT/G40/l82qGwurlKvuKqYb6Y4jEap6DSiVqLu35uOrhbWIZ3PaI0mkvA+gANbFywl8u3tVx9VGhfLwds43Ri7aY6PM0zu6mzyxkN4J42QRPKTNlsLG10oh0bkIFRxzd9vuSyYthopcnhmoS0flm33TvbZll0Y1V747w0f0bE3q5AmYurHqoyHHqmkTdFOFYI1J4q+JUynRX+BK18KucIbLDlbZPZzPzOiF9cznNid0oUyyY7NAHUeHtKanutHFHNNjKj/HkSdiNCzPLje0kQWf56z+5PNm6GY24sVPwnRjrWXXcJgU6H/3E6Z3DrsrBn0H2U99TpwTRtOz45rPdpfY4OITm3HT9ko1WM8OlC+a9/zH9q7KIrmH6ElCkhtCkU8bdqfVLlEN05yHqb3DsWBPbG/igvNzIGfPeDlHDpJN3tNhL193QUEnuyuuL179tt8wGEsvsjV6sev7TpLqa89683EnducJBJA5YeosaOGxMY1Dccd/0LuFMMvl18024uBUjuyZ7/sy2d3wm+xSpgvQ6wUrw4pdwT+15GQeKTDLoJOI6caHkqyAVr394OSP0/uQ1BfgYDF0jqzgP9If1Gh5hbmoUAMTcJg25iS6kb9x/F/Y77q7VKubP';
        const response = await axios.get(`https://api-dalle-gen.onrender.com/dalle3?auth_cookie_U=${_U}&auth_cookie_KievRPSSecAuth=${KievRPSSecAuth}&prompt=${encodeURIComponent(prompt)}`);
        const imageUrls = response.data.results.images;
        
        res.json({
          images: imageUrls
        });
        return;
      } catch (error) {
        console.error(error);
      }
      res.status(500).json({
        error: 'Internal Server Error.'
      });
    });
  }
};