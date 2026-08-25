import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Base64Encoder from './tools/Base64Encoder'
import { tools } from './data/tools'
import Layout from './components/Layout'
import About from './components/About'

function Home() {
    return (

      <main>
        <section className="hero">
          <h2>RYAN's S.A.K TOOLS</h2>

          <p>
            aka Swiss Army Knife Tools <br />A collection of small, useful tools for everyday problems.
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
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="base64-encoder" element={<Base64Encoder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App