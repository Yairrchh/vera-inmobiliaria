import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

function Layout() {
  const { pathname } = useLocation()
  const transparent = pathname === '/'

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar transparent={transparent} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
