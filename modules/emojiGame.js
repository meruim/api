const quizDataPath = '../data/emojiquizData.json';
const quizData = require(quizDataPath);

module.exports = {
  run: async function ({
    app, requestHandler, axios, path, fs
  }) {
    app.get("/api/emojigame", async (req, res) => {
      const {
        prompt, emoji, answer, id
      } = req.query;

      if (!prompt) {
        return res.status(400).json({
          error: "Invalid prompt",
        });
      }

      if (prompt === "getquiz") {
        const randomIndex = Math.floor(Math.random() * quizData.length);
        const randomQuestion = quizData[randomIndex];

        res.json({
          id: randomQuestion.id,
          emoji: randomQuestion.emoji,
          answer: randomQuestion.answer,
        });
      } else if (prompt === "add") {
        if (!emoji || !answer) {
          return res.status(400).json({
            error: "Both emoji and answer are required for 'add' prompt",
          });
        }

        const latestId = quizData.length > 0 ? quizData[quizData.length - 1].id: 0;
        const newQuestion = {
          id: latestId + 1,
          emoji,
          answer,
        };

        quizData.push(newQuestion);
        fs.writeFileSync(path.join(__dirname, quizDataPath), JSON.stringify(quizData, null, 2));

        res.json({
          id: newQuestion.id,
          emoji: newQuestion.emoji,
          answer: newQuestion.answer,
        });
      } else if (prompt === "delete") {
        if (!id) {
          return res.status(400).json({
            error: "ID is required for 'delete' prompt",
          });
        }

        const foundIndex = quizData.findIndex(question => question.id == id);
        if (foundIndex !== -1) {
          const deletedQuestion = quizData.splice(foundIndex, 1)[0];
          fs.writeFileSync(path.join(__dirname, quizDataPath), JSON.stringify(quizData, null, 2));

          res.json({
            message: `Question with ID ${id} deleted successfully`,
            deletedQuestion,
          });
        } else {
          res.status(404).json({
            error: `Question with ID ${id} not found`,
          });
        }
      }
    });
  },
};