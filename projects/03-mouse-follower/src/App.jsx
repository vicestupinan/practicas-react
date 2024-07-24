import { useEffect, useState } from 'react'

function App () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('effect', { enabled })

    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    // agregar evento cuando se activa el estado enabled
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // getEvenListener(window) ver suscripciones a un evento en chromium

    // limpiar eventos
    // se ejecuta cuanto el componente se desmonta y cuando cambian las dependencias
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return () => {
      document.body.classList.remove('no-cursor')
    }
  })

  return (
    <main>
      <div style={
        {
          position: 'absolute',
          backgroundColor: '#09f',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -10,
          top: -10,
          width: 20,
          height: 20,
          transform: `translate(${position.x}px, ${position.y}px)`
        }
      }
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </main>
  )
}

export default App
