import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="app">
      <header className="header">
        <a href="/" className="logo">
          S.A.K Tools
        </a>

        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
      </header>

      <Outlet />

      <footer className="footer">

        <div className="footer-inner">

        <div className="footer-brand">
          <strong>S.A.K Tools</strong>
          <span>© 2026</span>
          <span>Built by Ryan Lim</span>
        </div>

        <div className="footer-links">
          <strong>Links</strong>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </div>

        </div>
      </footer>
    </div>
  )
}

export default Layout