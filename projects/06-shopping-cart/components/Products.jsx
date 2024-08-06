import { AddToCartIcon } from './Icons.jsx'
import './Products.css'

export function Products ({ products }) {
  return (
    <main className='products'>
      <ul>
        {products.slice(0, 10).map(product => (
          <li key={product.id}>
            <img
              src={product.images[0]}
              alt={product.title}
            />
            <div>
              <strong>{product.title}</strong> - ${product.price}
            </div>
            <button>
              <AddToCartIcon />
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
