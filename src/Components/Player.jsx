import React, { useState } from 'react'

export default function Player({initialName, symbol, isActive, onChangeName}) {
  console.log("rendering Player component");
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  let playerNameComponent = <span className="player-name">{playerName}</span>;

  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if(isEditing) {
        onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  if(isEditing) {
    playerNameComponent = <input type="text" required value={playerName} onChange={handleChange}/>;
  }

  return (
    <li className={isActive ? 'active': undefined}>
        <span className="player">
            {playerNameComponent}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}
