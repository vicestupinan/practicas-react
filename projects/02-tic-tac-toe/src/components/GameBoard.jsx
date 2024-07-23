import { Square } from './Square.jsx'

// Mapeo del tablero en el html, creacion de un cuadro (Square) por cada espacio en el tablero
export const GameBoard = ({ board, updateBoard }) => {
  return (
    <section className='game'>
      {board.map((square, index) => (
        <Square key={index} index={index} updateBoard={updateBoard}>
          {square}
        </Square>
      ))}
    </section>
  )
}
