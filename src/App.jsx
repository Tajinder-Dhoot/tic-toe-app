import { useState } from "react"
import GameBoard from "./Components/GameBoard"
import Player from "./Components/Player"
import Log from "./Components/Log";
import {WINNING_COMBINATIONS} from './winning-combinations.js';

function getActivePlayer(gameTurns) {
  let activePlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    activePlayer = 'O';
  }

  return activePlayer;
}

function App() {
  console.log("rendering APP component");
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = getActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
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

  console.log('active player: ' + activePlayer);
  // console.log('game turns: ' + gameTurns[0]);

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare = {handleSelectSquare} turns = {gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
