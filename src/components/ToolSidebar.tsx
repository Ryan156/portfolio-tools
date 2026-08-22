import { tools } from '../data/tools'

function ToolSidebar() {
  return (
    <aside className="tool-sidebar">
      <h2>Other Tools</h2>

      <input
        type="search"
        placeholder="Search for a tool"
        aria-label="Search for a tool"
      />

      <nav>
        {tools.map((tool) => (
          <a key={tool.id} href={`/${tool.id}`}>
            {tool.name}
          </a>
        ))}
      </nav>
    </aside>
  )
}

export default ToolSidebar