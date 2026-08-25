import { useState } from "react";
import ToolSidebar from "../components/ToolSidebar";
import Toast from "../components/Toast";

function Loremipsum() {

    const [paragraphCount, setParagraphCount] = useState('5')
    const [type, setType] = useState('paragraphs')
    const [result, setResult] = useState('')
    const [toasts, setToasts] = useState<string[]>([])
    const loremText = `
    Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis
    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
    eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt
    in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit
    amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus
    et netus et malesuada fames ac turpis egestas Vestibulum tortor quam feugiat
    vitae ultricies eget tempor sit amet ante Donec eu libero sit amet quam egestas
    semper Aenean ultricies mi vitae est Mauris placerat eleifend leo Quisque sit
    amet est et sapien ullamcorper pharetra Vestibulum erat wisi condimentum sed
    commodo vitae ornare sit amet wisi Aenean fermentum elit eget tincidunt
    condimentum eros ipsum rutrum orci sagittis tempus lacus enim ac dui Duis
    aliquet egestas purus in blandit Curabitur vulputate vestibulum lorem
    Suspendisse potenti
    `
    const loremWords = loremText.trim().split(/\s+/)

    const generateWords = (count: number) => {
    const start = Math.floor(
        Math.random() * (loremWords.length - count)
    )

    return loremWords
        .slice(start, start + count)
        .join(' ')
    }
    
    const generateSentence = () => {
        return generateWords(10) + '.'
    }

    const generateParagraph = () => {
        const sentences = Array.from(
        { length: 5 },
        () => generateSentence()
    )
        return sentences.join(' ')
    }   

    const generate = () => {
        const count = Number(paragraphCount)

        if (type === 'words') {
            setResult(generateWords(count))
        }

        if (type === 'sentences') {
            const sentences = Array.from(
                { length: count },
                () => generateSentence()
            )

            setResult(sentences.join(' '))
        }

        if (type === 'paragraphs') {
            const paragraphs = Array.from(
                { length: count },
                () => generateParagraph()
            )

            setResult(paragraphs.join('\n\n'))
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

    return(
        <div className="tool-layout">
            <ToolSidebar/>

            <main className="tool-main">

                <h1>Lorem Ipsum Generator</h1>

                <p className="tool-description">
                    Generate a random lorem ipsum text.
                </p>

                <section className="tool-panel">

                <div className="lorem-controls">

                    <input
                    type="number"
                    value={paragraphCount}
                    onChange={(event) => setParagraphCount(event.target.value)}
                    min="1"
                    max="50"
                    />

                    <select 
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                    >
                    <option value="paragraphs">paragraphs</option>
                    <option value="sentences">sentences</option>
                    <option value="words">words</option>
                    </select>

                </div>

                <div className="lorem-actions">
                    <button
                    type="button"
                    className="generate-button"
                    onClick={generate}
                    >
                    Generate
                    </button>

                    <button
                    type="button"
                    className="lorem-copy-button"
                    onClick={copyResult}
                    disabled={!result}
                    >
                    Copy
                    </button>
                </div>

                    <textarea
                    className="generated-result"
                    id="generated-result"
                    value={result}
                    readOnly
                    placeholder="Your generated result will appear here..."
                    />

                <Toast toasts={toasts} />

                </section>
            </main>
        </div>
    )
}

export default Loremipsum