import  { createContext, useContext, useState } from 'react'


 const AuthContext = createContext();


export default function AuthProvider({children}) {

  
     const [user, setUser] = useState(() => {
    const name = localStorage.getItem('CurrentUserName')
    const email = localStorage.getItem('CurrentUserEmail')

    return name && email ? { name, email } : null
  })
    
    function SignUp(name,email,password){
       const users = JSON.parse(localStorage.getItem("Users"))||[];
       const existingUser = users.find((x) => x.email == email);
       if(existingUser){
        return {success:false,error:"User already exists"};
       }
       const newUser = {name,email,password};
       users.push(newUser);
       localStorage.setItem("Users",JSON.stringify(users));
       localStorage.setItem("CurrentUserEmail",email);
       localStorage.setItem("CurrentUserName",name);
       setUser({name,email});
       return {success:true,msg:`Welcome ${name}`};   
    }
    function Login(email,password){
      const users = JSON.parse(localStorage.getItem("Users"));
      const loggedUser = users.find((x) => x.email === email && x.password===password);
      if(!loggedUser){
        return {success:false,error:"Invalid email or password"};
      }
      localStorage.setItem("CurrentUserEmail",loggedUser.email);
      localStorage.setItem("CurrentUserName",loggedUser.name);
      setUser({name:loggedUser.name,email:loggedUser.email});
      return {success:true,msg:`Welcome back ${loggedUser.name}`};
    }
    function Logout(){
        localStorage.removeItem("CurrentUserEmail");
        localStorage.removeItem("CurrentUserName");
        setUser(null);
        return {success:true,msg:"Logged Out Successfully"};
    }
  
    return (
    <AuthContext.Provider value={{ SignUp,user, Login, Logout }}>
       {children} 
    </AuthContext.Provider> 
  )
}

export function useUser(){
    const context = useContext(AuthContext);
    return context;
};
