import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'

const LINKS = [
  { to: '/propiedades', label: 'Propiedades' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

function NavBar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (!transparent) return undefined
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [transparent])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const solid = !transparent || scrolled
  const linkTone = solid ? 'text-ink/70 hover:text-ink' : 'text-white/80 hover:text-white'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? 'bg-paper/95 shadow-sm shadow-ink/5 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="shrink-0">
          <Logo dark={solid} />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${linkTone} ${
                  isActive ? (solid ? 'text-ink' : 'text-white') : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/contacto"
          className={`hidden shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors md:inline-block ${
            solid
              ? 'bg-ink text-white hover:bg-azure'
              : 'bg-white/10 text-white ring-1 ring-inset ring-white/40 hover:bg-white/20'
          }`}
        >
          Agendar visita
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full md:hidden ${
            solid ? 'text-ink' : 'text-white'
          }`}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-sand bg-paper px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm font-medium text-ink/80">
                {link.label}
              </Link>
            ))}
            <Link
              to="/contacto"
              className="mt-1 inline-block rounded-full bg-ink px-5 py-2 text-center text-sm font-medium text-white"
            >
              Agendar visita
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default NavBar
