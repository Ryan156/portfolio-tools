import { useEffect, useState, type CSSProperties } from "react";
import ToolSidebar from '../components/ToolSidebar'

function AnalogClock() {

    const [time, setTime] = useState(new Date())

    useEffect(() => {

        const interval = setInterval(() => {

            setTime(new Date())

        }, 50)

        return () => clearInterval(interval)

    }, [])

    const hours = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    const milliseconds = time.getMilliseconds()

    const secondAngle = seconds * 6 + milliseconds * 0.006

    const minuteAngle =
        minutes * 6 +
        seconds * 0.1

    const hourAngle =
        (hours % 12) * 30 +
        minutes * 0.5 +
        seconds / 120

    return (
        <div className="tool-layout">
            <ToolSidebar/>
            <main className="tool-main">
                <h1>Analog Clock</h1>
                <p className="tool-description">
                    Display an analog clock.
                </p>

                <section className="tool-panel">
                    <div className="clock">
                        <div
                            className="second-hand"
                            style={{ transform: `rotate(${secondAngle}deg)` }}
                        />
                        <div
                            className="minute-hand"
                            style={{ transform: `rotate(${minuteAngle}deg)` }}
                        />
                        <div
                            className="hour-hand"
                            style={{ transform: `rotate(${hourAngle}deg)` }}
                        />
                        <div className="clock-center" />
                            <div className="tick-marks">
                                {Array.from({ length: 60 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`tick ${index % 5 === 0 ? 'hour-tick' : ''}`}
                                        style={{
                                            transform: `rotate(${index * 6}deg)`
                                        }}
                                    >
                                        <div className="tick-line" />
                                    </div>
                                ))}
                            </div>
                    </div>
            </section>
        </main>
    </div>
    )
}

export default AnalogClock