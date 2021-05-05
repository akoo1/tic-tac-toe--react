
import React, { useState, useEffect } from 'react';
import './PlayBoard.css';


const PlayBoard = () => {

  const [currPlayer, setCurrPlayer] = useState('circle')
  const [showResult, setShowResult] = useState(false)
  const [isTie, setIsTie] = useState(false)
  const [winner, setWinner] = useState('')
  const [circleWinCount, setCircleWinCount] = useState(0)
  const [xWinCount, setXWinCount] = useState(0)

  const [cell1, setCell1] = useState(null)
  const [cell2, setCell2] = useState(null)
  const [cell3, setCell3] = useState(null)
  const [cell4, setCell4] = useState(null)
  const [cell5, setCell5] = useState(null)
  const [cell6, setCell6] = useState(null)
  const [cell7, setCell7] = useState(null)
  const [cell8, setCell8] = useState(null)
  const [cell9, setCell9] = useState(null)

  const WIN_COMBOS = [
    // 3 horizontal
    [cell1, cell2, cell3],
    [cell4, cell5, cell6],
    [cell7, cell8, cell9],
    // 3 vertical
    [cell1, cell4, cell7],
    [cell2, cell5, cell8],
    [cell3, cell6, cell9],
    // 2 diagonal
    [cell1, cell5, cell9],
    [cell3, cell5, cell7]
  ]

  const CELL_NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9]





  // I need to call a function after setState() is finished, setState() is async, thus,
  // componentDidMount() or useEffect() is the perfect solution here.
  useEffect(() => {
    checkForWinner()
  }, [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9])


  const checkForWinner = () => {

    for (let i = 0; i < WIN_COMBOS.length; i += 1) {
      if (WIN_COMBOS[i][0] === 'circle' && WIN_COMBOS[i][1] === 'circle' && WIN_COMBOS[i][2] === 'circle') {
        setShowResult(true)
        setWinner('Circle')
        setCircleWinCount(circleWinCount + 1)
      }
      else if (WIN_COMBOS[i][0] === 'x' && WIN_COMBOS[i][1] === 'x' && WIN_COMBOS[i][2] === 'x') {
        setShowResult(true)
        setWinner('X')
        setXWinCount(xWinCount + 1)
      }
    }

    if (
      cell1 != null && cell2 != null && cell3 != null &&
      cell4 != null && cell5 != null && cell6 != null &&
      cell7 != null && cell8 != null && cell9 != null
    ) {
      setShowResult(true)
      setIsTie(true)
    }

  }


  const switchPlayer = () => {
    if (currPlayer === 'circle') {
      setCurrPlayer('x')
    }
    else {
      setCurrPlayer('circle')
    }
  }

  const cellClickedHandler = (cellNum) => {

    if (cellNum === 1 && !cell1) {
      setCell1(currPlayer)
    }
    else if (cellNum === 2 && !cell2) {
      setCell2(currPlayer)
    }
    else if (cellNum === 3 && !cell3) {
      setCell3(currPlayer)
    }
    else if (cellNum === 4 && !cell4) {
      setCell4(currPlayer)
    }
    else if (cellNum === 5 && !cell5) {
      setCell5(currPlayer)
    }
    else if (cellNum === 6 && !cell6) {
      setCell6(currPlayer)
    }
    else if (cellNum === 7 && !cell7) {
      setCell7(currPlayer)
    }
    else if (cellNum === 8 && !cell8) {
      setCell8(currPlayer)
    }
    else if (cellNum === 9 && !cell9) {
      setCell9(currPlayer)
    }
    else {
      alert('This cell is taken!')
    }

    switchPlayer()
  }


  const restartHandler = () => {
    setShowResult(false)
    setCurrPlayer('circle')
    setCell1(null)
    setCell2(null)
    setCell3(null)
    setCell4(null)
    setCell5(null)
    setCell6(null)
    setCell7(null)
    setCell8(null)
    setCell9(null)
  }



  let cell1Mark = null
  if (cell1 === 'circle') cell1Mark = <i className="fas fa-dot-circle"></i>
  else if (cell1 === 'x') cell1Mark = <i className="fas fa-times"></i>

  let cell2Mark = null
  if (cell2 === 'circle') cell2Mark = <i className="fas fa-dot-circle"></i>
  else if (cell2 === 'x') cell2Mark = <i className="fas fa-times"></i>

  let cell3Mark = null
  if (cell3 === 'circle') cell3Mark = <i className="fas fa-dot-circle"></i>
  else if (cell3 === 'x') cell3Mark = <i className="fas fa-times"></i>

  let cell4Mark = null
  if (cell4 === 'circle') cell4Mark = <i className="fas fa-dot-circle"></i>
  else if (cell4 === 'x') cell4Mark = <i className="fas fa-times"></i>

  let cell5Mark = null
  if (cell5 === 'circle') cell5Mark = <i className="fas fa-dot-circle"></i>
  else if (cell5 === 'x') cell5Mark = <i className="fas fa-times"></i>

  let cell6Mark = null
  if (cell6 === 'circle') cell6Mark = <i className="fas fa-dot-circle"></i>
  else if (cell6 === 'x') cell6Mark = <i className="fas fa-times"></i>

  let cell7Mark = null
  if (cell7 === 'circle') cell7Mark = <i className="fas fa-dot-circle"></i>
  else if (cell7 === 'x') cell7Mark = <i className="fas fa-times"></i>

  let cell8Mark = null
  if (cell8 === 'circle') cell8Mark = <i className="fas fa-dot-circle"></i>
  else if (cell8 === 'x') cell8Mark = <i className="fas fa-times"></i>

  let cell9Mark = null
  if (cell9 === 'circle') cell9Mark = <i className="fas fa-dot-circle"></i>
  else if (cell9 === 'x') cell9Mark = <i className="fas fa-times"></i>


  return (
    <>
      <div className='win-count-container'>
        <h1>O wins: {circleWinCount}</h1>
        <h1>X wins: {xWinCount}</h1>
      </div>

      <div className='board-container'>
        {
          CELL_NUMS.map((cellNum, index) =>
            <div
              className={`cell cell-${cellNum}`}
              onClick={() => cellClickedHandler(cellNum)}
              key={index}
            >
              { // eval() allows you to create dynamic variables
                eval('cell' + cellNum + 'Mark')
              }
            </div>
          )
        }
      </div>


      <h2 className='next-player-message'>
        Next Player: {currPlayer === 'circle' ? 'O' : 'X'}
      </h2>

      {
        showResult
          ? <div className='winning-message'>
            {
              isTie
                ? <p className='winning-message-text'>It's a Tie!</p>
                : <p className='winning-message-text'>{winner} Wins!</p>
            }
            <button className='btn btn-restart' onClick={restartHandler}>Restart</button>
          </div>
          : null
      }
    </>
  )
}


export default PlayBoard;
