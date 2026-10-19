import { Film } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import SearchBox from './SearchBox'
import { useUser } from '../context/AuthContext'
import { CircleUser } from 'lucide-react'

const Navbar = () => {
  const { SignUp,user, Login, Logout } = useUser()

  const handleLogout = () =>{
   const confirm =  window.confirm("Are you sure you want to log out?");
   if(confirm) 
   Logout();
  }

  const activeRoute = ({ isActive }) =>
    `whitespace-nowrap font-bold transition-colors hover:text-blue-600 ${
      isActive ? 'text-blue-600 border-b-3 border-blue-600' : 'text-gray-700'
    }`

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 py-3 shadow-md bg-white ">
      <div className="mx-auto flex max-w-7xl items-center justify-start gap-7 ">
        <div className="flex gap-2 ml-8 text-blue-600">
          <Film className="w-8 h-8" />
          <h3 className="text-2xl text-gray-700 font-bold hover:text-blue-600 transition-colors">
            CineScope
          </h3>
        </div>
        <div className="flex gap-14 ml-16 ">
          <NavLink className={activeRoute} to="/">
            Home
          </NavLink>
          <NavLink className={activeRoute} to="/watchlist">
            WatchList
          </NavLink>
        </div>
        <div className="flex gap-8 ml-auto items-center ">
          <div className="w-64">
            <SearchBox Position="top" />
          </div>
          <div className="flex shrink-0 items-center gap-5">
            {user ? (
              <>
                {' '}
                <CircleUser size={24} />
                <h1 className="font-semibold text-gray-500">{user?.name}</h1>
                <button onClick={handleLogout} className='bg-red-500 cursor-pointer rounded-md p-1 text-white hover:bg-red-300'>Logout</button>
              </>
            ) : (
              <>
                <NavLink className={activeRoute} to="/auth">
                  Join us
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
