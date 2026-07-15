import { useState } from "react"
import { signUp } from "../services/firebase";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      signUp(email, password);
      navigate("login");
    } catch(err: any) {
      setError(err.message || "Signup failed");
    }
  }

  return(
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" justifyContent="center">
      <Typography variant="h5">Sign Up</Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained">Sign Up</Button>
      </form>
    </Box>
  )
}

export default SignUp;