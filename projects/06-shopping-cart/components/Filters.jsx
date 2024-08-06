import { useState, useId } from 'react'
import './Filters.css'

export function Filters ({ onChange }) {
  const [minPrice, setMinPrice] = useState(0)

  const minPriceFilterdId = useId()
  const categoryFilterdId = useId()

  const handleChangeMinPrice = (event) => {
    setMinPrice(event.target.value)
    onChange(prevState => ({
      ...prevState,
      minPrice: event.target.value
    }))
  }

  const handleChangeCategory = (event) => {
    onChange(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceFilterdId}>Price</label>
        <input
          type='range'
          id={minPriceFilterdId}
          min={0}
          max={1000}
          onChange={handleChangeMinPrice}
        />
        <span>${minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterdId}>Category</label>
        <select id={categoryFilterdId} onChange={handleChangeCategory}>
          <option value='all'>All</option>
          <option value='Clothes'>Clothes</option>
          <option value='Electronics'>Electronics</option>
          <option value='Shoes'>Shoes</option>
          <option value='Furniture'>Furniture</option>
          <option value='Miscellaneous'>Miscellaneous</option>
        </select>
      </div>
    </section>
  )
}
