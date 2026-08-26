import { useEffect, useRef, useState } from 'react'
import ToolSidebar from '../components/ToolSidebar'

function Stopwatch() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)

  const startTimeRef = useRef(0)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!running) return

    startTimeRef.current = performance.now() - elapsed

    const update = () => {
      setElapsed(performance.now() - startTimeRef.current)
      animationRef.current = requestAnimationFrame(update)
    }

    animationRef.current = requestAnimationFrame(update)

    return () => cancelAnimationFrame(animationRef.current)
  }, [running])

  const start = () => {
    setRunning(true)
  }

  const pause = () => {
    setRunning(false)
  }

  const reset = () => {
    setRunning(false)
    setElapsed(0)
  }

  const minutes = Math.floor(elapsed / 60000)
  const seconds = Math.floor((elapsed % 60000) / 1000)
  const centiseconds = Math.floor((elapsed % 1000) / 10)

  const formattedTime =
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}.` +
    `${String(centiseconds).padStart(2, '0')}`

  return (
    <div className="tool-layout">
      <ToolSidebar />

      <main className="tool-main">
        <h1>Stopwatch</h1>

        <p className="tool-description">
          Measure time with a stopwatch.
        </p>

        <div className="tool-panel stopwatch">
          <div className="stopwatch-display">
            {formattedTime}
          </div>

          <div className="stopwatch-actions">
            {!running ? (
              <button onClick={start}>
                Start
              </button>
            ) : (
              <button onClick={pause}>
                Pause
              </button>
            )}

            <button onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Stopwatch