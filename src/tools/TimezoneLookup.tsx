import { useEffect, useState } from "react"

import ToolSidebar from "../components/ToolSidebar"

const timezones = [
    {
        value: "UTC",
        label: "UTC (UTC+00:00)",
        name: "Coordinated Universal Time",
    },
    {
        value: "Etc/GMT+12",
        label: "UTC−12:00",
        name: "UTC−12:00",
    },
    {
        value: "Etc/GMT+11",
        label: "UTC−11:00",
        name: "UTC−11:00",
    },
    {
        value: "Etc/GMT+10",
        label: "UTC−10:00",
        name: "UTC−10:00",
    },
    {
        value: "Etc/GMT+9",
        label: "UTC−09:00",
        name: "UTC−09:00",
    },
    {
        value: "Etc/GMT+8",
        label: "UTC−08:00",
        name: "UTC−08:00",
    },
    {
        value: "Etc/GMT+7",
        label: "UTC−07:00",
        name: "UTC−07:00",
    },
    {
        value: "Etc/GMT+6",
        label: "UTC−06:00",
        name: "UTC−06:00",
    },
    {
        value: "Etc/GMT+5",
        label: "UTC−05:00",
        name: "UTC−05:00",
    },
    {
        value: "Etc/GMT+4",
        label: "UTC−04:00",
        name: "UTC−04:00",
    },
    {
        value: "Etc/GMT+3",
        label: "UTC−03:00",
        name: "UTC−03:00",
    },
    {
        value: "Etc/GMT+2",
        label: "UTC−02:00",
        name: "UTC−02:00",
    },
    {
        value: "Etc/GMT+1",
        label: "UTC−01:00",
        name: "UTC−01:00",
    },
    {
        value: "Etc/GMT-1",
        label: "UTC+01:00",
        name: "UTC+01:00",
    },
    {
        value: "Etc/GMT-2",
        label: "UTC+02:00",
        name: "UTC+02:00",
    },
    {
        value: "Etc/GMT-3",
        label: "UTC+03:00",
        name: "UTC+03:00",
    },
    {
        value: "Etc/GMT-4",
        label: "UTC+04:00",
        name: "UTC+04:00",
    },
    {
        value: "Etc/GMT-5",
        label: "UTC+05:00",
        name: "UTC+05:00",
    },
    {
        value: "Etc/GMT-6",
        label: "UTC+06:00",
        name: "UTC+06:00",
    },
    {
        value: "Etc/GMT-7",
        label: "UTC+07:00",
        name: "UTC+07:00",
    },
    {
        value: "Etc/GMT-8",
        label: "UTC+08:00",
        name: "UTC+08:00",
    },
    {
        value: "Etc/GMT-9",
        label: "UTC+09:00",
        name: "UTC+09:00",
    },
    {
        value: "Etc/GMT-10",
        label: "UTC+10:00",
        name: "UTC+10:00",
    },
    {
        value: "Etc/GMT-11",
        label: "UTC+11:00",
        name: "UTC+11:00",
    },
    {
        value: "Etc/GMT-12",
        label: "UTC+12:00",
        name: "UTC+12:00",
    },
    {
        value: "Asia/Kuala_Lumpur",
        label: "Malaysia (MYT)",
        name: "Malaysia Time",
    },
    {
        value: "Asia/Tokyo",
        label: "Japan (JST)",
        name: "Japan Standard Time",
    },
    {
        value: "Asia/Seoul",
        label: "South Korea (KST)",
        name: "Korea Standard Time",
    },
    {
        value: "America/New_York",
        label: "New York",
        name: "Eastern Time",
    },
    {
        value: "America/Los_Angeles",
        label: "Los Angeles",
        name: "Pacific Time",
    },
    {
        value: "Europe/London",
        label: "London",
        name: "United Kingdom Time",
    },
    {
        value: "Australia/Sydney",
        label: "Sydney",
        name: "Australia Eastern Time",
    },
]

function TimezoneLookup() {
    const detectedTimezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone

    const [currentTime, setCurrentTime] = useState(new Date())
    const [selectedTimezone, setSelectedTimezone] = useState("")

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const getTime = (timezone: string) => {
        return new Intl.DateTimeFormat("en-MY", {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }).format(currentTime)
    }

    const getDate = (timezone: string) => {
        return new Intl.DateTimeFormat("en-MY", {
            timeZone: timezone,
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(currentTime)
    }

    const getTimezoneInfo = (timezone: string) => {
        return timezones.find(
            (timezoneItem) => timezoneItem.value === timezone
        )
    }

    const formatTimezoneId = (timezone: string) => {
        return timezone
            .replace(/_/g, " ")
            .replace("Etc/GMT", "UTC")
    }

    const detectedTimezoneInfo =
        getTimezoneInfo(detectedTimezone)

    const selectedTimezoneInfo =
        getTimezoneInfo(selectedTimezone)

    return (
        <div className="tool-layout">
            <ToolSidebar />

            <main className="tool-main">
                <h1>Timezone Lookup</h1>

                <p className="tool-description">
                    Lookup time information for different timezones.
                </p>

                <section className="tool-panel timezone-panel">
                    <div className="timezone-grid">

                        {/* Current timezone */}
                        <div className="timezone-column">
                            <p className="timezone-label">
                                Your current timezone
                            </p>

                            <div className="timezone-heading">
                                <h2>
                                    {detectedTimezoneInfo?.name ??
                                        detectedTimezone}
                                </h2>
                            </div>

                            <p className="timezone-id">
                                {formatTimezoneId(detectedTimezone)}
                            </p>

                            <div className="timezone-clock">
                                {getTime(detectedTimezone)}
                            </div>

                            <p className="timezone-date">
                                {getDate(detectedTimezone)}
                            </p>
                        </div>

                        {/* Compare timezone */}
                        <div className="timezone-column">
                            <p className="timezone-label">
                                Compare timezone
                            </p>

                            <div className="timezone-heading">
                                <select
                                    className="timezone-select"
                                    value={selectedTimezone}
                                    onChange={(event) =>
                                        setSelectedTimezone(
                                            event.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Select a timezone
                                    </option>

                                    {timezones.map((timezone) => (
                                        <option
                                            key={timezone.value}
                                            value={timezone.value}
                                        >
                                            {timezone.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <p className="timezone-id">
                                {selectedTimezone
                                    ? selectedTimezoneInfo?.name
                                    : "Select a timezone"}
                            </p>

                            <div
                                className={`timezone-clock ${
                                    !selectedTimezone
                                        ? "timezone-clock-empty"
                                        : ""
                                }`}
                            >
                                {selectedTimezone
                                    ? getTime(selectedTimezone)
                                    : "--:--:--"}
                            </div>

                            <p className="timezone-date">
                                {selectedTimezone
                                    ? getDate(selectedTimezone)
                                    : "Waiting for selection"}
                            </p>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    )
}

export default TimezoneLookup