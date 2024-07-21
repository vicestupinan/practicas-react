import { useState } from "react";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinner, checkEndGame } from "./logic/board.js";

function App() {
  //Definicion del tablero con 9 posiciones y rellenar en null
  const [board, setBoard] = useState(Array(9).fill(null));

  //Definicion de estado para los turnos, turno inicial y cambio de turno
  const [turn, setTurn] = useState(TURNS.X);

  //Definicion de estado para establecer ganador
  //null no hay ganador, false empate
  const [winner, setWinnner] = useState(null);

  //Reiniciar juego
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinnner(null);
  };

  //Actualizacion del tablero
   const updateBoard = (index) => {
    //Evitar actualizacion de tablero si ya esta marcado
    if (board[index]) return;

    //Actualizar tablero despues de cada jugada
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //Cambio de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //Revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinnner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinnner(false); //empate
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className="game">
        {
          //Mapeo del tablero en el html, creacion de un cuadro (Square) por cada espacio en el tablero
          board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            );
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : "Ganó:"}</h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
