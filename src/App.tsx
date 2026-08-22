import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Base64Encoder from './tools/Base64Encoder'
import { tools } from './data/tools'
import Layout from './components/Layout'

function Home() {
    return (

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
    
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/base64-encoder" element={<Base64Encoder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App