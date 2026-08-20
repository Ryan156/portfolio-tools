import './App.css'

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
          <div className="tool-card">
            <h2>Base64 Encoder</h2>
            <p>Encode text to Base64</p>
          </div>

          <div className="tool-card">
            <h2>Base64 Decoder</h2>
            <p>Decode a Base64 string</p>
          </div>

          <div className="tool-card">
            <h2>Random Number Generator</h2>
            <p>Generate a random number</p>
          </div>

          <div className="tool-card">
            <h2>UUID Generator</h2>
            <p>Generate a random UUID</p>
          </div>
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