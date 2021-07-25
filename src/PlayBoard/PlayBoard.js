
import React, { useState, useEffect } from 'react';
import './PlayBoard.css';

const WIN_COMBOS = [
  // 3 rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // 3 columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // 2 diagonals
  [0, 4, 8],
  [2, 4, 6]
]



const PlayBoard = () => {

  const [cells, setCells] = useState(Array(9).fill(''))
  const [currPlayer, setCurrPlayer] = useState('o')
  const [showResult, setShowResult] = useState(false)
  const [isTie, setIsTie] = useState(false)
  const [winner, setWinner] = useState('')
  const [oWinCount, setOWinCount] = useState(0)
  const [xWinCount, setXWinCount] = useState(0)


  // I need to call checkForWinner() after setState() is finished, setState() is async, thus,
  // componentDidUpdate() or useEffect() with dependency is the perfect solution here. It allows
  // me to do side effects after the component has re-rendered.
  useEffect(() => {
    checkForWinner()
  }, [cells])


  const checkForWinner = () => {

    WIN_COMBOS.forEach(winCombo => {
      if (cells[winCombo[0]] === 'o' && cells[winCombo[1]] === 'o' && cells[winCombo[2]] === 'o') {
        setShowResult(true)
        setWinner('O')
        setOWinCount(oWinCount + 1)
      }
      else if (cells[winCombo[0]] === 'x' && cells[winCombo[1]] === 'x' && cells[winCombo[2]] === 'x') {
        setShowResult(true)
        setWinner('X')
        setXWinCount(xWinCount + 1)
      }
    })

    // Check for a tie
    // forEach() won't work here because it won't stop even if there's a return statement, a for loop is the solution.
    for (let i = 0; i < cells.length; i += 1) {
      if (cells[i] === '') {
        return;
      }
    }

    setShowResult(true)
    setIsTie(true)
  }



  const cellClickedHandler = (index) => {
    let newCells = [...cells]
    newCells[index] = currPlayer
    setCells(newCells)
    switchPlayer()
  }

  const switchPlayer = () => {
    currPlayer === 'o' ? setCurrPlayer('x') : setCurrPlayer('o')
  }

  const restartGameHandler = () => {
    setShowResult(false)
    setCurrPlayer('o')
    setCells(Array(9).fill(''))
  }




  return (
    <>
      <div className='win-count-container'>
        <h1>O wins: {oWinCount}</h1>
        <h1>X wins: {xWinCount}</h1>
      </div>

      <div className='board-container'>
        {
          cells.map((cell, index) => {

            if (cell === 'o') cell = <i className="fas fa-dot-circle"></i>
            else if (cell === 'x') cell = <i className="fas fa-times"></i>

            return (
              <div
                className={`cell cell-${index}`}
                onClick={() => cellClickedHandler(index)}
                key={index}
              >
                {cell}
              </div>
            )
          })
        }
      </div>


      <h2 className='next-player-message'>
        Next Player: {currPlayer === 'o' ? 'O' : 'X'}
      </h2>

      {
        showResult &&
          <div className='winning-message'>
            {
              isTie
                ? <p className='winning-message-text'>It's a Tie!</p>
                : <p className='winning-message-text'>{winner} Wins!</p>
            }
            <button className='btn btn-restart' onClick={restartGameHandler}>Restart</button>
          </div>

      }
    </>
  )
}


export default PlayBoard;
