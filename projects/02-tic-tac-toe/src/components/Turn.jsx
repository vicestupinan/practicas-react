import { Square } from '../components/Square.jsx'
import { TURNS } from '../constants.js'

export const Turn = ({ turn }) => {
  return (
    <section className='turn'>
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>
  )
}
