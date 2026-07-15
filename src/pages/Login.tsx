import { useState } from "react";
import { signIn } from "../services/firebase";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      
    try {
      signIn(email, password);
    } catch(err: any) {
      setError(err.message || "Login failed");
    }
  }

  return(
    <Box display="flex" width="100%" flexDirection="column" alignItems="center" minHeight="100vh" justifyContent="center">
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px", }}>
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained">Login</Button>
        <Button variant="outlined" onClick={() => navigate("/signup")}>Create an account</Button>
      </form>
    </Box>
  )
}

export default Login;