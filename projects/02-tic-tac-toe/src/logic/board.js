import { WINNER_COMBOS, TURNS } from '../constants.js'

// Logica de juego

// Validar ganador
export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  return null
}

// Validar si hay empate (Si ya se ocuparon todas las posiciones y no hay ganador)
export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}

// Cambio de turno
export const newTurn = (turn) => { return turn === TURNS.X ? TURNS.O : TURNS.X }
