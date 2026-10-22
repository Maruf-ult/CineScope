
import { Film, MenuIcon, X, CircleUser } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import SearchBox from './SearchBox'
import { useUser } from '../context/AuthContext'
import { useState } from 'react'

const Navbar = () => {
  const { user, Logout } = useUser()
  const [MenuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to log out?'
    )

    if (isConfirmed) {
      Logout()
      setMenuOpen(false)
    }
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const activeRoute = ({ isActive }) =>
    `whitespace-nowrap font-bold transition-colors hover:text-blue-600 ${
      isActive
        ? 'text-blue-600 border-b-3 border-blue-600'
        : 'text-gray-700'
    }`

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white py-3 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-start gap-7">

        <div className="hidden lg:flex items-center"></div>

        <div className="hidden lg:flex gap-2 ml-8 text-blue-600">
          <Film className="w-8 h-8" />
          <h3 className="text-2xl text-gray-700 font-bold hover:text-blue-600 transition-colors">
            CineScope
          </h3>
        </div>

        <div className="hidden lg:flex gap-14 ml-16">
          <NavLink className={activeRoute} to="/">
            Home
          </NavLink>

          <NavLink className={activeRoute} to="/watchlist">
            WatchList
          </NavLink>
        </div>

      
        <div className="hidden lg:flex gap-8 ml-auto items-center">
          <div className="w-64">
            <SearchBox Position="top" />
          </div>

          <div className="flex shrink-0 items-center gap-5">
            {user ? (
              <>
                <CircleUser size={24} />

                <h1 className="font-semibold text-gray-500">
                  {user?.name}
                </h1>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 cursor-pointer rounded-md p-1 text-white hover:bg-red-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink className={activeRoute} to="/auth">
                Join us
              </NavLink>
            )}
          </div>
        </div>

    
        <div
          className={`lg:hidden flex-1 ${
            MenuOpen
              ? 'flex flex-col items-start w-full px-3'
              : 'flex items-center min-w-0 px-3'
          }`}
        >
          <button
            type="button"
            className={MenuOpen ? 'self-end' : 'shrink-0'}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={MenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={MenuOpen}
          >
            {MenuOpen ? (
              <X
                className="bg-white border border-blue-500 cursor-pointer hover:bg-blue-600 hover:text-white"
                size={20}
              />
            ) : (
              <MenuIcon size={20} />
            )}
          </button>

          {MenuOpen ? (
            <div className="flex flex-col ml-4 gap-4 items-start">
              <NavLink
                onClick={closeMenu}
                className={activeRoute}
                to="/"
              >
                Home
              </NavLink>

              <NavLink
                onClick={closeMenu}
                className={activeRoute}
                to="/watchlist"
              >
                WatchList
              </NavLink>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="font-bold cursor-pointer rounded-md text-red-500 hover:bg-red-300"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  onClick={closeMenu}
                  className={activeRoute}
                  to="/auth"
                >
                  Join us
                </NavLink>
              )}
            </div>
          ) : (
            <div className="relative flex flex-1 min-w-0 items-center justify-center">

            
              <div className="flex items-center justify-center gap-2">
                <Film className="w-6 h-6 shrink-0" />

                <h3 className="text-xl text-gray-700 font-bold hover:text-blue-600 transition-colors whitespace-nowrap">
                  CineScope
                </h3>
              </div>

              <div className="absolute right-0 flex items-center">
                {user ? (
                  <div className="flex items-center gap-2">
                    <CircleUser size={24} />

                  </div>
                ) : (
                  <NavLink
                    onClick={closeMenu}
                    className={activeRoute}
                    to="/auth"
                  >
                    Join us
                  </NavLink>
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar
