const typewriterMapping = {
  a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶",
  j: "𝗷", k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿",
  s: "𝘀", t: "𝘁", u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇",
  A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
  J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥",
  S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭",
  " ": " "
};
const {cookies} = 'eQhTg9PeSb4dDoCnbfUHTREkZF3cLfS4ZH3CxDYXiDI128OGhFn8fqL426tfFrCz7OADmw.';
module.exports = {
  run: async function({ axios, app, requestHandler }) {

    app.get('/api/bard', async (req, res) => {
      let { prompt, uid, attImg, name } = req.query

      if (!prompt || !uid) {
        return res.status(400).json({ error: "Missing 'prompt' and 'uid' parameter!" });
      }

      const handle = await requestHandler.userRequest(uid, name );
      if (handle) {
        return res.json({result: handle.error});
      }

      try {
        if (attImg) {
          var response = await axios.get(`https://api-bard.easy0.repl.co/api/bard?message=${encodeURIComponent(prompt)}&url=${encodeURIComponent(attImg)}&userID=${encodeURIComponent(uid)}&api=ISOYXD`);
        } else {
          response = await axios.get(`https://api-bard.easy0.repl.co/api/bard?message=${encodeURIComponent(prompt)}&userID=${encodeURIComponent(uid)}&api=ISOYXD`);
        }
        const result = response.data;
        const textToRemove = "\nThis API is Developed and Maintained by ADONIS JR S Sanchez (ISOY DEV)\nwww.facebook.com/buckyy26";
        const cleanedResult = result.content.endsWith(textToRemove) ? result.content.slice(0, -textToRemove.length) : result.content;

          res.json({ result: cleanedResult, images: result.images });
          return;
      } catch (error) {
        console.error(`Easyapi0: ${error}`);
      }

      try {
        const params = {
          prompt: encodeURIComponent(prompt),
          cookie: encodeURIComponent('eQhTg9PeSb4dDoCnbfUHTREkZF3cLfS4ZH3CxDYXiDI128OGhFn8fqL426tfFrCz7OADmw.'),
          attImage: '',
          apiKey: encodeURIComponent('SiAM_xcxndu')
        };

        if (attImg) {
          params.attImage = encodeURIComponent(attImg);
        }

        const response = await axios.get('https://api.siambardproject.repl.co/getBard', {
          params: params,
        });
        const result = response.data;

        const cleanedAnswer = result.answer.replace(/\n{3,}/g, '\n\n');
        const finalAnswer = cleanedAnswer.replace(/❏/g, '');

        let responseBody = {
          result: finalAnswer,
          attachment: result.attachment || [],
        };

    res.status(200).json(responseBody);
        return;
      } catch (error) {
        console.error(`siambardproject: ${error}`);
      }

    });
  }
};
