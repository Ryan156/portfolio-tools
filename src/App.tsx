import './App.css'

const tools = [
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder',
    description: 'Encode text to Base64',
  },
  {
    id: 'base64-decoder',
    name: 'Base64 Decoder',
    description: 'Decode a Base64 string',
  },
  {
    id: 'random-number-generator',
    name: 'Random Number Generator',
    description: 'Generate a random number',
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate a random UUID',
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON',
  },
]

function App() {
  return (
    <div className="app">
      <header className="header">
        <a href="/" className="logo">
          ryan's tools
        </a>

        <nav>
          <a href="/">Home</a>
          <a href="/">About</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>RYAN'S WEB TOOLS</h1>

          <p>
            A collection of small, useful tools for everyday problems.
          </p>

          <input
            type="search"
            placeholder="Search for a tool..."
            aria-label="Search for a tool"
          />
        </section>

      <section className="tools">
        {tools.map((tool) => (
          <a key={tool.id} href={`/${tool.id}`} className="tool-card">
            <h2>{tool.name}</h2>
            <p>{tool.description}</p>
          </a>
        ))}
      </section>

      </main>

        <footer className="footer">
          <div className="footer-brand">
            <strong>ryan's tools</strong>
            <span>© 2026</span>
            <span>Built by Ryan</span>
          </div>

          <div className="footer-links">
            <strong>Links</strong>
            <a href="/">Home</a>
            <a href="/">About</a>
          </div>
        </footer>
    </div>
    
  )
}

export default App