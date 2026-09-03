import { Routes, Route, BrowserRouter, Link} from 'react-router-dom'
import './App.css'
import Base64Encoder from './tools/Base64Encoder'
import { tools } from './data/tools'
import { useState } from 'react'
import Layout from './components/Layout'
import About from './components/About'
import Base64Decoder from './tools/Base64Decoder'
import Loremipsum from './tools/Loremipsum'
import AnalogClock from './tools/AnalogClock'
import Stopwatch from './tools/Stopwatch'
import TVShowLookup from './tools/TVShowLookup'
import TVShowDetails from './tools/TVShowDetails'
import PasswordGenerator from './tools/PasswordGenerator'
import PasswordStrengthChecker from './tools/PasswordStrengthChecker'
import PDFMerge from './tools/PDFMerge'
import TimezoneLookup from './tools/TimezoneLookup'

function Home() {

  const [search, setSearch] = useState('')
  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  )

    return (

      <main>
        <section className="home-hero">
          <h2>RYAN's S.A.K TOOLS</h2>

          <p>
            aka Swiss Army Knife Tools <br />A collection of small, useful tools for everyday problems.
          </p>

          <input
            type="search"
            placeholder="Search for a tool..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search for a tool"
          />
        </section>

        <section className="tools">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <Link
                key={tool.id}
                to={`/${tool.id}`}
                className="tool-card"
              >
                <h2>{tool.name}</h2>
                <p>{tool.description}</p>
              </Link>
            ))
          ) : (
            <p className="no-results">
              No tools found for "{search}".
            </p>
          )}
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
          <Route path="base64-decoder" element={<Base64Decoder />} />
          <Route path="lorem-ipsum-generator" element={<Loremipsum />} />
          <Route path="analog-clock" element={<AnalogClock />} />
          <Route path="stopwatch" element={<Stopwatch />} />
          <Route path="tv-show-lookup" element={<TVShowLookup />} />
          <Route path="tv-show-lookup-details/:id" element={<TVShowDetails />} />        
          <Route path="password-generator" element={<PasswordGenerator />} />
          <Route path="password-strength-checker" element={<PasswordStrengthChecker />} />
          <Route path="pdf-merge" element={<PDFMerge />} />
          <Route path="timezone-lookup" element={<TimezoneLookup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App