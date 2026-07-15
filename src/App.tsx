import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import type { User } from "firebase/auth"

import { auth } from "./services/firebase"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Todos from "./pages/Todos"

const App = () => {
  const [user, setUser] =useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseuser) => {
      setUser(firebaseuser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [])

  if(loading) return <p>Loading...</p>

  return(
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/todos" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/todos" />} />

        {/* Private route */}
        <Route path="/todos" element={user ? <Todos /> : <Navigate to="/login" />} />

        {/* Default route */}
        <Route path="*" element={<Navigate to={user ? "/todos" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
