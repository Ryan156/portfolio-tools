import { useState } from 'react'
import ToolSidebar from '../components/ToolSidebar'

function Base64Encoder() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  const encode = () => {
    const encoded = btoa(input)
    setResult(encoded)
  }

  const copyResult = async () => {
  await navigator.clipboard.writeText(result)
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
                Copy
                </button>

            </section>

            <section className="tool-about">
            <h2>About Base64 Encoder</h2>

            <h3>What is Base64?</h3>
            <p>
                Base64 is an encoding method that represents binary data using
                a set of 64 ASCII characters. It is commonly used when binary
                data needs to be represented as text.
            </p>

            <h3>Is Base64 encryption?</h3>
            <p>
                No. Base64 is encoding, not encryption. Encoded data can be
                decoded without a key.
            </p>

            <h3>Example</h3>
            <p>
                <code>Hello World</code> → <code>SGVsbG8gV29ybGQ=</code>
            </p>
            </section>

        </main>
    </div>
    )
}

export default Base64Encoder