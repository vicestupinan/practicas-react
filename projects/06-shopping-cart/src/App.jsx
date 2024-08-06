import { Header } from '../components/Header'
import { Products } from '../components/Products'
// import { products as initialProducts } from '../mocks/products.json'
import { useState, useEffect } from 'react'

function useFilters () {
  const [filters, setFilters] = useState({ category: 'all', minPrice: 0 })
  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === 'all' || product.category.name === filters.category)
      )
    })
  }
  return { filterProducts, setFilters }
}

function App () {
  const [products, setProducts] = useState([])
  const { filterProducts, setFilters } = useFilters()

  const getProducts = () => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }

  useEffect(getProducts, [])

  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header changeFilters={setFilters} />
      <Products products={filteredProducts} />
    </>
  )
}

export default App
