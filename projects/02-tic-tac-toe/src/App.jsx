import { useState } from "react";

//Definicion de turnos
const TURNS = {
  X: "x",
  O: "o",
};

//Definicion del cuadro dentro del tablero
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  //Definicion del tablero con 9 posiciones y rellenar en null
  const [board, setBoard] = useState(Array(9).fill(null));

  //Definicion de estado para los turnos, turno inicial y cambio de turno
  const [turn, setTurn] = useState(TURNS.X);

  //Definicion de estado para establecer ganador
  //null no hay ganador, false empate
  const [winner, setWinnner] = useState(null);

  //Validar ganador
  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  //Validar si hay empate (Si ya se ocuparon todas las posiciones y no hay ganador)
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  //Reiniciar juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinnner(null)
  }

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
    }else if (checkEndGame(newBoard)) {
      setWinnner(false) //empate
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
