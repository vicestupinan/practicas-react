import { useEffect, useState } from "react"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { GameBoard } from "./components/GameBoard.jsx"
import { TURNS } from "./constants.js"
import { checkWinner, checkEndGame, newTurn } from "./logic/board.js"
import { Turn } from "./components/Turn.jsx"

function App() {
  //Definicion del tablero con 9 posiciones y rellenar en null
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null)
  })

  //Definicion de estado para los turnos, turno inicial y cambio de turno
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  //Definicion de estado para establecer ganador
  //null no hay ganador, false empate
  const [winner, setWinnner] = useState(null)

  //Reiniciar juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinnner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  //Actualizacion del tablero
  const updateBoard = (index) => {
    //Evitar actualizacion de tablero si ya esta marcado
    if (board[index]) return

    //Actualizar tablero despues de cada jugada
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //Cambio de turno
    setTurn(newTurn(turn))

    //Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn(turn))

    //Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinnner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinnner(false) //empate
    }
  }

  //Ejemplo useEffect
  //Recibe dos parametros, codigo a ejecutar y dependencias
  //Las dependencias definen cuando se va a ejecutar el useEffect, si no se envian las dependencias se ejecutara cada vez que se renderice el componente
  useEffect(()=>{
    //Siempre se ejecutar como minimo una vez
    console.log('Ejecucion useEffect')
  }, [winner]) //El useEffect se ejecutara nuevamente cada vez que el valor de winner cambie

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      <button onClick={resetGame}>Reiniciar</button>

      <GameBoard board={board} updateBoard={updateBoard} />

      <Turn turn={turn} />

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
