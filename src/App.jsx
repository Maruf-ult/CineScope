import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import AuthProvider from './context/AuthContext'
import MovieProvider from './context/movieContext'
import WatchList from './Pages/WatchList'

function App() {
  return (
    <>
      <AuthProvider>
        <MovieProvider>
          <Navbar />
          <main classsName="pt-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path='/watchlist' element={<WatchList/>}/>
            </Routes>
          </main>
        </MovieProvider>
      </AuthProvider>
    </>
  )
}

export default App
