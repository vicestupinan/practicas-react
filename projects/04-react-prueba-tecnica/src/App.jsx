import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export function App () {
  const [fact, setFact] = useState()
  const [words, setWords] = useState()

  // Obtener un hecho aleatorio
  const getRandomFact = () => {
    // ejemplo con axios
    axios.get(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => {
        const { fact } = res.data
        setFact(fact)
      })
      .catch(error => {
        console.error('Error: ', error)
      })

    // ejemplo con fetch
    /* fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)

        const threeFirstWords = fact.split(' ', 3).join(' ')
        console.log(threeFirstWords)
        setWords(threeFirstWords)

        // El endpoint ya no devuelve la url dentro del json
        fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
          .then(res => res.json)
          .then(response => {
            const { url } = response
            setImageUrl(`https://cataas.com${url}`)
          })
      }) */
  }

  useEffect(getRandomFact, [])

  // Obtener una imagen cada vez que tenemos un hecho
  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ')
    console.log(threeFirstWords)
    setWords(threeFirstWords)
  }, [fact])

  return (
    <main>
      <h1>Capp</h1>
      <button onClick={getRandomFact}>Get random fact</button>
      <section>
        {fact && <p>{fact}</p>}
        {words && <img src={`https://cataas.com/cat/says/${words}?fontSize=50&fontColor=red`} alt={`Image extracted using first three words for ${fact}`} />}
      </section>
    </main>
  )
}
