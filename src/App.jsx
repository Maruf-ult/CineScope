import Navbar from "./components/Navbar"
import { Routes,Route } from "react-router-dom"
import Home from "./Pages/Home"
import Auth from "./Pages/Auth"
import AuthProvider from "./context/AuthContext"

function App() {


  return (
    <>
    <AuthProvider>
    <Navbar/>
    <div classsName="pt-10">
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/auth" element={<Auth/>}/>
       </Routes>
       </div>
    </AuthProvider> 
    </>
  )
}

export default App
