import React, { useState } from 'react'

function GameBoard({ onSelectSquare, board }) {
    console.log("rendering gameboard component");

    return (
    <ol id='game-board'>
        {board.map((row, rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol != null ? true : false}>{playerSymbol}</button>
                        </li>
                    ))}
                </ol>
            </li>
        ))
    }
    </ol>
    )
}

export default GameBoard