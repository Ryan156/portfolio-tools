import { useState } from 'react'
import ToolSidebar from '../components/ToolSidebar'
import Toast from '../components/Toast'

function Base64Encoder() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [toasts, setToasts] = useState<string[]>([])

  const encode = () => {
    const encoded = btoa(input)
    setResult(encoded)
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
        <h1>Base64 Encoder</h1>

        <p className="tool-description">
            Encode text into Base64.
        </p>

            <section className="tool-panel">
                <label htmlFor="encoder-input">
                Text to Encode
                </label>

                <textarea
                id="encoder-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Enter text here..."
                />

                <button 
                type="button" 
                className="encode-button" 
                onClick={encode}
                >
                Encode
                </button>

                <label htmlFor="encoder-result">
                Encoded Result
                </label>

                <textarea
                id="encoder-result"
                value={result}
                readOnly
                placeholder="Your encoded result will appear here..."
                />

                <button
                type="button"
                className="copy-button"
                onClick={copyResult}
                disabled={!result}
                >
                Copy Encoded Text
                </button>

                <Toast toasts={toasts} />

            </section>

            <section className="tool-about">
            <h2>About Base64 Encoder</h2>

            <h3>What is Base64?</h3>
            <p>
                Base64 is a encoding mechanism that encodes binary-to-text. 
                That is binary data is converted to ASCII string format by using radix-65 representation.
            </p>

            <h3>How does Base64 encoding work?</h3>
            <p>
                Base64 encoding works by translating the data into a radix-64 representation. 
                That means all input characters is converted to a choose 64 chracters that can be easily printed as text. 
                Mostly it uses A-Z, a-z, 0-9, + & /. = character is used for padding in base64 encoding
            </p>

            <h3>What is the use of Base64 encoding?</h3>
            <p>
                 Base64 encoding is used to transmit binary format data or files across channels that only suports text contents.
                 It is mostly used in Web pages for embedding image files and other binary files.
                 Also used for sending attachements in emails.
            </p>

            <h3>What is Base64 encoding example?</h3>
            <p>
                <code>Hello World</code> → <code>SGVsbG8gV29ybGQ=</code>
            </p>
            </section>

        </main>
    </div>
    )
}

export default Base64Encoder