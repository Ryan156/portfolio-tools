import { Outlet } from 'react-router-dom'

function Layout() {
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

      <Outlet />

      <footer className="footer">

        <div className="footer-inner">

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

        </div>
      </footer>
    </div>
  )
}

export default Layout