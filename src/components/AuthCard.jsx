import { useState } from 'react';
import { useUser } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, User, UserCircle } from 'lucide-react'; // Removed Form from here

const AuthCard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("login");
  
  const { SignUp, Login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Fixed typo here
    setError(null);

    if (mode === "login") {
      const result = Login(email, password);
      if (result.success) {
        alert(result.msg);
        navigate("/");
      } else {
        setError(result.error);
      }
    } else {
      const res = SignUp(name, email, password);
      if (res.success) {
        alert(res.msg);
        navigate("/");
      } else {
        setError(res.error);
      }
    }
  };

  const isLogin = mode === "login";

  return (
    <form onSubmit={handleSubmit} className='flex flex-col p-10 px-16 gap-6 max-w-md mx-auto'>
      
      <div className='flex gap-10 border-b border-gray-200 pb-2 cursor-pointer justify-center'>
        <h2 
          onClick={() => setMode("login")} 
          className={`text-lg font-semibold ${isLogin ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
        >
          Login
        </h2>
        <h2 
          onClick={() => setMode("register")} 
          className={`text-lg font-semibold ${!isLogin ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
        >
          Register
        </h2>
      </div>

      {error && <p className='text-red-400 text-center'>{error}</p>}


      {!isLogin && (
        <div className='flex items-center gap-2 border rounded-sm p-2 bg-white'>
          <UserCircle size={20} className="text-gray-400" /> 
          <input 
            type="text" 
            required 
            minLength={5} // Fixed typo here
            placeholder='Full Name' // Fixed placeholder text
            className='w-full text-black outline-none ' 
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}


      <div className='flex items-center gap-2 border rounded-sm p-2 bg-white'>
        <User size={20} className="text-gray-400"/> 
        <input 
          type="email" 
          required 
          placeholder='maruf@example.com' 
          className='w-full text-black outline-none' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>

      <div className='flex items-center gap-2 border rounded-sm p-2 bg-white'>
        <Lock size={20} className="text-gray-400" /> 
        <input 
          type="password" 
          required 
          minLength={6} 
          placeholder='.........' 
          className='w-full text-black outline-none' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>

      <button 
        type='submit' 
        className=" w-full cursor-pointer rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700"
      >
        {isLogin ? "Sign In" : "Create Account"}
      </button>

      <div className='text-center mt-1'>
        {isLogin ? (
          <p className='text-gray-400'>
            Don't have an account?{' '}
            <span onClick={() => setMode("register")} className='text-blue-500 underline cursor-pointer'>
              Sign Up
            </span>
          </p>
        ) : (
          <p className='text-gray-400'>
            Already have an account?{' '}
            <span onClick={() => setMode("login")} className='text-blue-500 underline cursor-pointer'>
              Sign In
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default AuthCard;
