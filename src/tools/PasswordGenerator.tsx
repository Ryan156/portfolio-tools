import { useState, useEffect } from "react"
import Toast from "../components/Toast"
import ToolSidebar from "../components/ToolSidebar"

function PasswordGenerator(){

    const [uppercase, setUppercase] = useState(true)
    const [lowercase, setLowercase] = useState(true)
    const [numbers, setNumbers] = useState(true)
    const [symbols, setSymbols] = useState(true)
    const [length, setLength] = useState(12)
    const [result, setResult] = useState('')
    const [toasts, setToasts] = useState<string[]>([])

    const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz'
    const numberCharacters = '0123456789'
    const symbolCharacters = '!@#$%^&*()_+=-`~/*-+<>,.";:{}[]|?'

    function getRandomIndex(max) {
    const array = new Uint32Array(1)

    const limit = Math.floor(2 ** 32 / max) * max

    let randomNumber

    do {
        crypto.getRandomValues(array)
        randomNumber = array[0]
    } while (randomNumber >= limit)

    return randomNumber % max
}

    function generate() {
        let characters = ''

        if(uppercase)
        {
            characters += uppercaseCharacters
        }

        if(lowercase)
        {
            characters += lowercaseCharacters
        }

        if(numbers)
        {
            characters += numberCharacters
        }

        if(symbols)
        {
            characters += symbolCharacters
        }

        if(characters.length === 0){
            return
        }

        let password = ''
        for (let i=0; i < length; i++)
        {
            password += characters[getRandomIndex(characters.length)]
        }

        setResult(password)

    }

    const noCharacterTypes = !uppercase && !lowercase && !numbers && !symbols

    useEffect(() => {
        if (noCharacterTypes) {
            setResult('')
            return
        }

        generate()
    }, [length, uppercase, lowercase, numbers, symbols])

    const copyResult = async () => {
    await navigator.clipboard.writeText(result)

    const id = crypto.randomUUID()

    setToasts((current) => [...current, id])

    setTimeout(() => {
    setToasts((current) =>
        current.filter((toastId) => toastId !== id)
    )
    }, 5000)
    }

    return(
        <div className="tool-layout">
            <ToolSidebar/>
            <main className="tool-main">
                <h1>Password Generator</h1>
                <p className="tool-description">Generate a random password.</p>
                    <section className="tool-panel">
                        <div className="password-control">

                            <button
                                type="button"
                                className="password-preview-button"
                                onClick={copyResult}
                                disabled={!result}
                            >
                                {result}
                            </button>

                            <div className="password-length">
                                <label>
                                    Password Length
                                </label>

                                <span>{length}</span>

                                <input
                                    type="range"
                                    min="4"
                                    max="32"
                                    value={length}
                                    onChange={(e) => setLength(Number(e.target.value))}
                                />
                            </div>

                            <div className="password-options">

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={uppercase}
                                        onChange={(e) => setUppercase(e.target.checked)}
                                    />
                                    Uppercase
                                </label>

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={lowercase}
                                        onChange={(e) => setLowercase(e.target.checked)}
                                    />
                                    Lowercase
                                </label>

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={numbers}
                                        onChange={(e) => setNumbers(e.target.checked)}
                                    />
                                    Numbers
                                </label>

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={symbols}
                                        onChange={(e) => setSymbols(e.target.checked)}
                                    />
                                    Symbols
                                </label>

                            </div>

                            <div className="password-actions">

                                <button
                                    type="button"
                                    className="generate-password-button"
                                    onClick={generate}
                                    disabled={noCharacterTypes}
                                >
                                    Generate Password
                                </button>

                                <button
                                    type="button"
                                    className="password-copy-button"
                                    onClick={copyResult}
                                    disabled={!result}
                                >
                                    Copy Password
                                </button>

                            </div>

                            <Toast toasts={toasts} />

                        </div>
                    </section>
            </main>

        </div>
    )
}

export default PasswordGenerator