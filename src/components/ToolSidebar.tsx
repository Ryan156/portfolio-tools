import { tools } from '../data/tools'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function ToolSidebar() {

  const [search, setSearch] = useState('')
  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <aside className="tool-sidebar">
      <h2>Other Tools</h2>

      <input
        type="search"
        placeholder="Search for a tool"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search for a tool"
      />

      <nav>
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <Link
                key={tool.id}
                to={`/${tool.id}`}
              >
                {tool.name}
              </Link>
            ))
          ) : (
            <p className="no-results">
              No tools found for "{search}".
            </p>
          )}
      </nav>
    </aside>
  )
}

export default ToolSidebar