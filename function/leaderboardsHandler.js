const fs = require('fs-extra');
const path = require('path');
const leaderBoardsData = path.join(__dirname, '../data/leaderBoardsData.json');

const leaderBoards = () => {
  try {
    const boardData = fs.readJsonSync(leaderBoardsData, {
      throws: false
    }) || [];

    if (boardData.length === 0) {
      return "No leaderboards data available.";
    }

    boardData.sort((a, b) => b.trophy - a.trophy);

    const result = boardData.map((entry, index) => `${index + 1}. ${entry.name} - Trophy ${entry.trophy}`);

    const formattedResult = result.join('\n');

    return formattedResult;
  } catch (error) {
    console.log(error);
    throw new Error(`Error retrieving leaderboards: ${error}`);
  }
};

async function dec( {
  id,
  name,
  trophy
}) {
  let success = false;
  try {
    if (!Number.isInteger(trophy)) {
      return {
        error: "Error Trophy Must Integer Not Type of string or object!"
      };
    }

    if (trophy <= 0 || trophy === null) {
      return {
        error: "Error! Trophy values must be not less than zero or null"
      };
    }
    const boardData = fs.readJsonSync(leaderBoardsData, {
      throws: false
    }) || [];

    const index = boardData.findIndex(entry => entry.id === id);

    if (index === -1) {
      boardData.push({
        id,
        name,
        trophy
      });
    } else {
      if (boardData[index].trophy > 0) {
        if (boardData[index].trophy - trophy >= 0) {
          boardData[index].trophy -= trophy;
          success = true;
        } else {
          return {
            error: "Invalid cannot decrease trophy below zero!"
          };
          console.log(`Cannot decrement trophy below zero for ID ${id}`);
        }
      } else {
        console.log(`Trophy is already zero for ID ${id}`);
        success = true;
      }

      if (boardData[index].name !== name) {
        console.log(`Name updated for ID ${id}: ${boardData[index].name} -> ${name}`);
        boardData[index].name = name;
      }
    }

    fs.writeJsonSync(leaderBoardsData, boardData);
    return {
      success
    };
  } catch (error) {
    return error;
  }
}

const inc = ({
  id, name, trophy
}) => {
  let success = false;
  try {
    if (!id) {
      return {
        error: "No ID"
      };
    }

    if (!Number.isInteger(trophy)) {
      return {
        error: "Error Trophy Must Integer Not Type of string or object!"
      };
    }

    if (trophy <= 0 || trophy === null) {
      return {
        error: "Error! Trophy values must be not less than zero or null"
      };
    }

    const boardData = fs.readJsonSync(leaderBoardsData, {
      throws: false
    }) || [];

    const index = boardData.findIndex(entry => entry.id === id);

    if (index === -1) {
      if (!name) {
        name = null;
      }

      boardData.push({
        id, name, trophy
      });
    } else {
      boardData[index].trophy += trophy;

      if (boardData[index].name !== name) {
        console.log(`Name updated for ID ${id}: ${boardData[index].name} -> ${name}`);
        boardData[index].name = name;
      }
    }
   success = true;
    fs.writeJsonSync(leaderBoardsData, boardData);

    return {success};
  } catch (error) {
    return {
      error: `Error in adding trophy. Error type: ${error.message}`
    };
  }
};

module.exports = {
  leaderBoards,
  dec,
  inc
};