import { useState } from "react"
import GameBoard from "./Components/GameBoard"
import Player from "./Components/Player"

function App() {
  console.log("rendering APP component");
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare() {
    setActivePlayer((curActivePlayer) => (
      curActivePlayer === 'X' ? 'O' : 'X'
    ));
  }

  console.log('active player: ' + activePlayer)

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare = {handleSelectSquare} activePlayerSymbol = {activePlayer === 'X' ? 'X' : 'O'}/>
      </div>
      LOG
    </main>
  )
}

export default App
