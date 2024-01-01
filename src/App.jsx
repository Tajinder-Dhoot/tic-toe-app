import { useState } from "react"
import GameBoard from "./Components/GameBoard"
import Player from "./Components/Player"
import Log from "./Components/Log";
import {WINNING_COMBINATIONS} from './winning-combinations.js';
import GameOver from "./Components/GameOver.jsx";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
};

function getActivePlayer(gameTurns) {
  let activePlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    activePlayer = 'O';
  }

  return activePlayer;
}

function getWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol ===thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function getGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  console.log("rendering APP component");
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = getActivePlayer(gameTurns);
  const gameBoard = getGameBoard(gameTurns);
  const winner = getWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    console.log("handleSelectSquare is executed");
    setGameTurns((prevTurns) => {
      const currentPlayer = getActivePlayer(prevTurns);
      const updatedTurns = [{
        square: { 
          row: rowIndex, 
          col: colIndex
        }, 
        player: currentPlayer
      },
      ...prevTurns];

      return updatedTurns;
    });
  }

  function handleSelectRematch() {
    console.log("handleSelectRematch is executed");
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={players['X']} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName={players.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onSelectRematch = {handleSelectRematch} />}
        <GameBoard onSelectSquare = {handleSelectSquare} board = {gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
