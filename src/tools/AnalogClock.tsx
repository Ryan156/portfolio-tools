import { useEffect, useState } from "react";

function AnalogClock() {

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const hours = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    const secondAngle = seconds * 6
    const minuteAngle = minutes * 6
    const hourAngle = (hours % 12) * 30 + minutes * 0.5

    return (
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
            <div className="tick-marks">
                {Array.from({ length: 60 }).map((_, index) => (
                <div
                    key={index}
                    className={`tick tick-${index}`}
                    style={{
                        transform: `
                            rotate(${index * 6}deg)
                            translateY(-140px)
                        `
                    }}
                />
                ))}
            </div>
        </div>
        
    )
}

export default AnalogClock