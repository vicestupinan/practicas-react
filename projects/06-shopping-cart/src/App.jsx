import { Header } from '../components/Header'
import { Products } from '../components/Products'
// import { products as initialProducts } from '../mocks/products.json'
import { useState, useEffect } from 'react'
import { useFilters } from '../hooks/useFilters'

function App () {
  const [products, setProducts] = useState([])
  const { filterProducts } = useFilters()

  const getProducts = () => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }

  useEffect(getProducts, [])

  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header />
      <Products products={filteredProducts} />
    </>
  )
}

export default App
