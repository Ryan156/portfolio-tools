import { useState } from 'react'
import ToolSidebar from '../components/ToolSidebar'
import Toast from '../components/Toast'

function Base64Decoder() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [toasts, setToasts] = useState<string[]>([])

    const decode = () => {
        try {
            const binary = atob(input)

            const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))

            const decoded = new TextDecoder('utf-8',{fatal:true}).decode(bytes)

            setResult(decoded)
        } catch {
            setResult('Error decoding Base64 string.')
        }

    }

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

    return (
        <div className="tool-layout">
        <ToolSidebar />

        <main className="tool-main">
        <h1>Base64 Decoder</h1>

        <p className="tool-description">
            Decode Base64 into text.
        </p>

            <section className="tool-panel">
                <label htmlFor="decoder-input">
                Text to Decode
                </label>

                <textarea
                id="decoder-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Enter Base64 text here..."
                />

                <button 
                type="button" 
                className="decode-button" 
                onClick={decode}
                >
                Decode
                </button>

                <label htmlFor="decoder-result">
                Decoded Result
                </label>

                <textarea
                id="decoder-result"
                value={result}
                readOnly
                placeholder="Your decoded result will appear here..."
                />

                <button
                type="button"
                className="copy-button"
                onClick={copyResult}
                disabled={!result}
                >
                Copy Decoded Text
                </button>

                <Toast toasts={toasts} />

            </section>

            <section className="tool-about">
            <h2>About Base64 Decoder</h2>

            <h3>What is Base64?</h3>
            <p>
                Base64 is a decoding mechanism that decodes Base64-encoded text back into its original binary form. 
                That is, Base64 text is converted to ASCII string format by using radix-65 representation.
            </p>

            <h3>How does Base64 decoding work?</h3>
            <p>
                Base64 decoding works by translating the Base64 string back into its original binary data. 
                That means all Base64 characters are converted to their corresponding binary values. 
                Mostly it uses A-Z, a-z, 0-9, + & /. = character is used for padding in base64 decoding
            </p>

            <h3>What is the use of Base64 decoding?</h3>
            <p>
                 Base64 decoding is used to convert Base64-encoded text back into its original binary format.
                 It is mostly used in Web pages for embedding image files and other binary files.
                 Also used for sending attachments in emails.
            </p>

            <h3>What is Base64 decoding example?</h3>
            <p>
                <code>SGVsbG8gV29ybGQ=</code> → <code>Hello World</code>
            </p>
            </section>

        </main>
    </div>
    )
}

export default Base64Decoder